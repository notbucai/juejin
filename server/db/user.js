const mongoose = require('./db.util');
const Article = require('./article');
const encryption = require('../encryption');

const Schema = mongoose.Schema({
  // 用户名
  username: {
    type: String,
    unique: true,
    required: true,
  },
  //  密码
  userpass: {
    type: String,
    unique: true,
    required: true,
  },
  //  手机号
  userphone: {
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


Schema.static('findUserById', async function (id) {
  const user = await this.findById(id, { userpass: 0 })

  if (!user) {
    throw new Error("未查询到该用户");
  }

  const articleList = await Article.findArticleListByUserid({ id });

  const extra = {
    likeNum: 0,
    lookNum: 0
  };

  articleList.forEach(item => {
    extra.likeNum += item.like_size || 0;
    extra.lookNum += item.look || 0;
  });
  extra.articleNum = articleList.length;

  return {
    ...user.toJSON(),
    ...extra
  };

});

Schema.static('findHotUser', async function () {

  const userList = (await this.find({}, { userpass: 0 }));
  const resList = [];

  for (let i = 0; i < userList.length; i++) {
    const item = userList[i];
    const user = await this.findUserById(item._id);
    resList.push(user);
  }

  return resList.sort((item_a, item_b) => {
    return (item_a.likeNum * 10 + item_a.lookNum > item_b.likeNum * 10 + item_b.lookNum) ? -1 : 1;
  }).splice(0, 20);

});

Schema.static('login', async function ({ loginName, loginPass }) {
  if (!loginName || !loginPass) {
    throw new Error("账号或密码不能为空");
  }

  const passEncrypted = encryption.md5(loginPass);
  const user = await this.findOne({
    $or: [
      { username: loginName },
      { userphone: loginName }
    ],
    userpass: passEncrypted
  }, { userpass: 0 });

  if (!user) {
    throw new Error("账号或密码错误");
  }

  return user;

});

Schema.static('register', async function (user) {

  if (!user.username || !user.userphone || !user.userpass) {
    throw new Error("用户名和手机号还有密码不能为空");
  }

  const _user = await this.findOne({
    $or: [
      { username: user.username },
      { userphone: user.userphone }
    ]
  });

  if (_user) {
    if (_user.username === user.username) {
      throw new Error("该用户名已存在");
    }
    if (_user.userphone === user.userphone) {
      throw new Error("该手机号已经注册");
    }
  }

  user.userpass = encryption.md5(user.userpass);

  await user.save();

  return user;

});

Schema.static('repass', async function ({ userphone, userpass }) {
  
  if (!userphone || !userpass) {
    throw new Error("手机号还有密码不能为空");
  }

  const _user = await this.findOne({ userphone: userphone });

  if (!_user) {
    throw new Error("该用户未注册");
  }

  userpass = encryption.md5(userpass);

  await this.updateOne({ _id: _user._id }, { userpass });

});
const User = mongoose.model('user', Schema);

module.exports = User;