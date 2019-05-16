const Article = require('../db/article');

function sortTotype(sort) {
  switch (sort) {
    case 'popular':
      return 0;
      break;
    case 'newest':
      return 1;
      break;
    case 'comment':
      return 2;
      break;

  }
  return 0;
}

const getAeticleListByNav_id = async (ctx, next) => {
  const { nav_id, tag_id, page, sort } = ctx.query;

  const skip = (page - 1 || 0) * 10,
    order = sortTotype(sort),
    list = await Article.findAeticleByNav_id({ nav_id: nav_id, tag_id: tag_id, skip, order });

  ctx.body = {
    code: 0,
    data: {
      list,
      hasNextPage: list && list.length >= 10
    }
  }
}

const getAeticleByid = async (ctx, next) => {
  const { id } = ctx.query;

  const _article = await Article.findAeticleByid({ id });
  ctx.body = {
    code: 0,
    data: _article
  }
}

module.exports = {
  getAeticleListByNav_id, getAeticleByid
}