const User = require('../db/user');

const getHotSimpleUserList = async (ctx, next) => {

  const _users = await User.findHotUser();

  ctx.body = {
    code: 0,
    data: [
      ..._users.splice(0, 5),
    ]
  }
};

const getHotUserList = async (ctx, next) => {

  const _users = await User.findHotUser();

  ctx.body = {
    code: 0,
    data: [
      ..._users,
    ]
  }
};

const getUserById = async (ctx, next) => {
  const { id } = ctx.query;

  const _users = await User.findUserById(id);

  ctx.body = {
    code: 0,
    data: {
      ..._users,
    }
  }
}

const login = async (ctx, next) => {
  const { loginName, loginPass } = ctx.request.body;
  const user = await User.login({ loginName, loginPass });
  ctx.body = {
    code: 0,
    data: {
      user
    }
  }
  ctx.session.user = user;
}

const register = async (ctx, next) => {
  const { username, userphone, userpass, code } = ctx.request.body;

  const validation = ctx.session.validation;

  if (!validation) {
    throw new Error("请先获取验证码");
  }

  const v = validation;

  if (v.phone !== userphone) {
    throw new Error("手机号和获取验证手机不匹配");
  }

  if (v.code !== parseInt(code) || v.now <= Date.now()) {
    throw new Error("验证码出错或验证码已超时");
  }

  const user = new User({ username, userphone, userpass, code });

  await User.register(user);

  ctx.session.validation = null;

  ctx.body = {
    code: 0,
    data: "注册成功，请登陆"
  }
}

module.exports = {
  getHotSimpleUserList, getHotUserList, getUserById, login, register
}