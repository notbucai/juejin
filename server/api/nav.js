const Nav = require('../db/nav');


const navigation = async (ctx, next) => {
  const list = await Nav.find();
  ctx.body = {
    code: 0,
    data: list
  }
}

module.exports = {
  navigation
}