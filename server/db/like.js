const mongoose = require('./db.util');
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema({
  // 目标id
  target_id: {
    type: ObjectId,
    required: true,
  },
  // 用户id
  user_id: {
    type: ObjectId,
    required: true,
  },
  // 点赞时间
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
});

Schema.static('like', async function (like) {

  const _like = await this.findOne({
    user_id: like.user_id, target_id: like.target_id
  });
  if (_like) {
    throw new Error("你已经操作过了");
  }

  await like.save();

});

const Like = mongoose.model('like', Schema);

// (async () => {
//   await new Like({
//     article_id: "5cd12e9ddcbf719419a7da5b",
//     user_id: "5cc65bb203cd1f23a2863195"
//   }).save()
// })()

module.exports = Like;