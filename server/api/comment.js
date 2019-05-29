const Comment = require('../db/comment');

const getCommentListByid = async (ctx, next) => {
  const { id } = ctx.query;

  const _comments = await Comment.findCommentsByArticle_id({ id });

  ctx.body = {
    code: 0,
    data: [
      ..._comments,
    ]
  }
}

module.exports = {
  getCommentListByid
}