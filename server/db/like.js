const mongoose = require('./db.util');

const Schema = mongoose.Schema({
  // 文章id
  article_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  // 用户id
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  // 点赞时间
  date: {
    type: Date,
    required: true,
    default: Date.now 
  },
});

const Like = mongoose.model('like', Schema);

// (async () => {
//   await new Like({
//     article_id: "5cd12e9ddcbf719419a7da5b",
//     user_id: "5cc65bb203cd1f23a2863195"
//   }).save()
// })()

module.exports = Like;