const mongoose = require('./db.util');
const User = require('./user');
const Article = require('./article');

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
    default: null
    // required: true,
  },
  // 评论ID
  comment_id: {
    type: ObjectId,
    required: false,
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

Schema.static('findCommentsByArticle_id', async function ({ id } = {}) {
  const oneCommentList = await this.aggregate([
    {
      $match: {
        article_id: ObjectId(id),
        comment_id: null
      }
    },
    {
      $sort: {
        _id: -1
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
        path: '$user',
        preserveNullAndEmptyArrays: true // 空的数组也拆分
      }
    },
    {
      $unwind: {
        path: '$reply_user',
        preserveNullAndEmptyArrays: true // 空的数组也拆分
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

Schema.static('saveComment', async function (comment) {

  const {
    article_id,
    user_id,
    reply_user_id = null,
    comment_id = null,
    content
  } = comment;


  if (!content || content.length >= 300) {
    throw new Error("内容不能为空且长度不能超过300");
  }

  const _article = await Article.findById(article_id);

  if (!_article) {
    throw new Error("不存在此文章");
  }
  const _user = await User.findById(user_id);

  if (!_user) {
    throw new Error("不存在此用户");
  }

  if (reply_user_id && comment_id) {

    const _comment = await this.findOne({ _id: ObjectId(comment_id) });
    const __user = await User.findById(reply_user_id);

    if (!_comment) {
      throw new Error("该楼层不存在");
    }

    if (!__user) {
      throw new Error("回复用户不存在");
    }
  }

  await comment.save();

  comment = comment.toJSON();
  comment.user = await User.findById(comment.user_id);
  comment.reply_user = await User.findById(comment.reply_user_id);
  return comment;
});

const Comment = mongoose.model('comment', Schema);

module.exports = Comment;