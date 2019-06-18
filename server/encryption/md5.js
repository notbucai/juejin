const crypto = require('crypto');

function md5(text) {
  const md5 = crypto.createHash('md5');
  const result = md5.update(text).digest('hex');
  return result;
}

module.exports = md5;