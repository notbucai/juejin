const Like = require('../db/like');

const like = async (ctx, next) => {

  const { id: target_id } = ctx.query;
  const { _id: user_id } = ctx.session.user;

  if (!target_id) {
    throw new Error("参数不能为空");
  }

  const like = new Like({
    user_id,
    target_id
  });
  await Like.like(like);
  
  ctx.body = {
    code: 0,
    data: {
      message: "成功"
    }
  }
}

module.exports = {
  like
}