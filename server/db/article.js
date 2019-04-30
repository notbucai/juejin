const mongoose = require('./db.util');

const Schema = mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: true,
  },
  // 发布时间
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  // 内容
  content: {
    type: String,
    required: true,
  },
  // 更新时间
  updated: {
    type: Date,
    default: Date.now
  },
  // 作者id
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  // 分类id
  nav_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

Schema.static('findAeticleByNav_id', async function ({
  nav_id,
  limit = 30,
  skip = 0,

}) {

  return await this.aggregate([
    {
      $project: {
        content: 0,
        updated: 0,
        _v: 0,
      }
    },
    {
      $match: {
        nav_id: mongoose.Types.ObjectId(nav_id),
      }
    },
    {
      $skip: skip // 不固定
    },
    {
      $limit: limit // 不固定
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
      $unwind: { // 拆分子数组
        path: "$user",
        preserveNullAndEmptyArrays: true // 空的数组也拆分
      }
    },
    {
      $lookup: { // 左连接
        from: "navs",
        localField: "nav_id",
        foreignField: "_id",
        as: "nav"
      }
    },
    {
      $unwind: { // 拆分子数组
        path: "$nav",
        preserveNullAndEmptyArrays: true // 空的数组也拆分
      }
    },
    // 标签映射
    {
      $lookup: { // 左连接
        from: "tagmaps",
        localField: "_id",
        foreignField: "article_id",
        as: "tagmap"
      }
    },
    // {
    //   $match: {
    //     'tagmap.tag_id': mongoose.Types.ObjectId('5cc545ee7ba5d016b5d0c2fa'),
    //   }
    // },
    //  标签
    {
      $lookup: { // 左连接
        from: "tags",
        localField: "tagmap.tag_id",
        foreignField: "_id",
        as: "tags"
      }
    },
  ]);

});

const Article = mongoose.model('article', Schema);

(async () => {
  const st_t = Date.now();
  console.log(JSON.stringify(await Article.findAeticleByNav_id({
    nav_id: "5cc3d64ea5d0aa06fed13656"
  }), 2, 2));
  console.log("====>",(await Article.findAeticleByNav_id({
    nav_id: "5cc3d64ea5d0aa06fed13656"
  })).length);
  
  console.log("===>  ", Date.now() - st_t);
  setTimeout(() => {
    process.exit();
  }, 0);
})();

module.exports = Article;