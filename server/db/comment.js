const mongoose = require('./db.util');
const User = require('./user');

const ObjectId = mongoose.Types.ObjectId;

const Schema = mongoose.Schema({
  // 文章id
  article_id: {
    type: ObjectId,
    required: true,
  },
  // 用户id
  user_id: {
    type: ObjectId,
    required: true,
    ref: "users"
  },
  // 回复ID
  reply_user_id: {
    type: ObjectId,
    // required: true,
  },
  // 评论ID
  comment_id: {
    type: ObjectId,
    // required: true,
  },
  // 内容
  content: {
    type: String,
    required: true,
  },
  // 时间
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
});

Schema.static('test', async function () {
  const oneCommentList = await this.aggregate([
    {
      $match: {
        article_id: ObjectId("5cc660b6423653247ff0b3f4"),
        comment_id: null
      }
    },
    {
      $lookup: { // 左连接
        from: "comments",
        localField: "_id",
        foreignField: "comment_id",
        as: "two_comments",
      }
    },
    {
      $lookup: { // 左连接
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $lookup: { // 左连接
        from: "users",
        localField: "reply_user_id",
        foreignField: "_id",
        as: "reply_user"
      }
    },
    {
      $unwind: {
        path: '$user'
      }
    },
    {
      $project: {
        // "content": 0,
        // "two_comments.content": 0,
        'article_id': 0,
        'two_comments.article_id': 0
      }
    }
  ]);

  const len = oneCommentList.length;
  for (let i = 0; i < len; i++) {
    const two_comments = oneCommentList[i].two_comments;
    for (let i = 0; i < two_comments.length; i++) {
      const item = two_comments[i];
      item.user = await User.findById(item.user_id);
      item.reply_user = await User.findById(item.reply_user_id);
    }
  }

  return oneCommentList;

});

const Comment = mongoose.model('comment', Schema);

module.exports = Comment;