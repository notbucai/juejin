const atuhConfig = require('../../../auth.config');
const User = require('../../db/user');

class Auth {
  constructor() {
    this.config = atuhConfig;
    this.User = User;
  }
}

module.exports = new Auth();