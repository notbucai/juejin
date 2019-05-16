const Tag = require('../db/tag');


const getTagsByNavId = async (ctx, next) => {
  const { id } = ctx.query;
  const list = await Tag.findByNav_id(id);
  ctx.body = {
    code: 0,
    data: list
  }
}

module.exports = {
  getTagsByNavId
}