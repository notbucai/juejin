const { db } = require('../../website.config');
const { url, dbName } = db || {
  "url": "mongodb://localhost:27017/",
  "dbName": "juejin"
};

var Mongoose = require('mongoose')

const start = Date.now();

Mongoose.connect(url + dbName, {
  useNewUrlParser: true,
  useCreateIndex: true,
});


Mongoose.connection.on('connected', function () {
  console.log('链接数据库成功 花费：' + (Date.now() - start) + 'ms');
});

/**
 * 连接异常
 */
Mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
* 连接断开
*/
Mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

module.exports = Mongoose;