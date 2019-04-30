const mongoose = require('./db.util');

const Schema = mongoose.Schema({
  // 用户名
  username: {
    type: String,
    unique: true,
    required: true,
  },
  // 头像
  avatar: {
    type: String
  },
  // 个人链接
  url: {
    type: String
  },
  // 公司
  company: {
    type: String
  },
  // 描述
  bio: {
    type: String
  },
  // 注册时间
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
});

const User = mongoose.model('user', Schema);

module.exports = User;