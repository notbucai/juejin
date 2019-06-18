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
    },
    token: await ctx.jwt.sign({ userid: user._id, rank: 1 })
  }
}

module.exports = {
  getHotSimpleUserList, getHotUserList, getUserById, login
}