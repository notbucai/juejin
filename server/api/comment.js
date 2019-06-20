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

// 需要权限
const saveComment = async (ctx, next) => {

  const {
    article_id,
    user_id,
    reply_user_id,
    comment_id,
    content
  } = ctx.request.body;

  const comment = new Comment({
    article_id,
    user_id,
    reply_user_id: reply_user_id || null,
    comment_id: comment_id || null,
    content
  });


  const _comment = await Comment.saveComment(comment);

  ctx.body = {
    code: 0,
    data: _comment
  }
}

module.exports = {
  getCommentListByid, saveComment
}