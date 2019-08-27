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

const getArticleListByNav_id = async (ctx, next) => {
  const { nav_id, tag_id, page, sort } = ctx.query;

  const skip = (page - 1 || 0) * 10,
    order = sortTotype(sort),
    list = await Article.findArticleByNav_id({ nav_id: nav_id, tag_id: tag_id, skip, order });
  ctx.body = {
    code: 0,
    data: {
      list,
      hasNextPage: list && list.length >= 10
    }
  }
}

const getArticleListByKey = async (ctx, next) => {
  const { key, page } = ctx.query;

  const skip = (page - 1 || 0) * 10,
    list = await Article.findKeyAll(key, skip);
  ctx.body = {
    code: 0,
    data: {
      list,
      hasNextPage: list && list.length >= 10
    }
  }
}


const getArticleByid = async (ctx, next) => {
  const { id } = ctx.query;

  const _article = await Article.findArticleByid({ id });
  // _comments = await Comment.findCommentsByArticle_id({ id });

  ctx.body = {
    code: 0,
    data: {
      ..._article,
    }
  }
}

module.exports = {
  getArticleListByNav_id, getArticleByid, getArticleListByKey
}