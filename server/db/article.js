const mongoose = require('./db.util');

const Schema = mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: true,
  },
  // 图片
  hero: {
    type: String,
    // required: true,
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
    ref: 'user'
  },
  // 分类id
  nav_id: {
    type: mongoose.Types.ObjectId,
    ref: 'nav'
  },
});

Schema.static('findAeticleByNav_id', async function ({
  nav_id,
  tag_id,
  limit = 10,
  skip = 0,
  order
} = {}) {

  const $match_article = {}
  const $match_tag = {}

  let $sort = {
    'like_size': -1
  };

  if (order === 0) {
    $sort = {
      'like_size': -1
    }
  } else if (order === 1) {
    $sort = {
      _id: -1
    }
  } else if (order === 2) {
    $sort = {
      'comments_size': -1
    }
  }

  nav_id && ($match_article.nav_id = mongoose.Types.ObjectId(nav_id));

  tag_id && ($match_tag['tagmap.tag_id'] = mongoose.Types.ObjectId(tag_id))

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
        ...$match_article,
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
    //  标签
    {
      $lookup: { // 左连接
        from: "tags",
        localField: "tagmap.tag_id",
        foreignField: "_id",
        as: "tags"
      }
    },
    {
      $match: {
        ...$match_tag
      }
    },
    //  喜欢
    {
      $lookup: { // 左连接
        from: "likes",
        localField: "_id",
        foreignField: "article_id",
        as: "likes"
      }
    },
    // 评论
    {
      $lookup: { // 左连接
        from: "comments",
        localField: "_id",
        foreignField: "article_id",
        as: "comments"
      }
    },

    {
      $project: {
        _id: 1,
        title: 1,
        date: 1,
        user: 1,
        nav: 1,
        tags: 1,
        // user_id: 1,
        // likes: 1,
        // comments: 1,
        like_size: {
          $size: "$likes"
        },
        comments_size: {
          $size: "$comments"
        }
      }
    },
    {
      $sort: {
        ...$sort,
        _id: -1
        // // 'like_size': -1,
        // comments_size: -1
      } // 不固定
    },
    // {
    //   $skip: skip // 不固定
    // },
    // {
    //   $limit: limit // 不固定
    // }
  ]).skip(skip).limit(limit);

});

Schema.static('findAeticleByid', async function ({
  id
} = {}) {
  console.log(id.length);
  
  console.log(typeof mongoose.Types.ObjectId(id));
  
  return (await this.aggregate([
    {
      $project: {
        // content: 0,
        // updated: 0,
        _v: 0,
      }
    },
    {
      $match: {
        _id: mongoose.Types.ObjectId(id)
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
    //  标签
    {
      $lookup: { // 左连接
        from: "tags",
        localField: "tagmap.tag_id",
        foreignField: "_id",
        as: "tags"
      }
    },
    //  喜欢
    {
      $lookup: { // 左连接
        from: "likes",
        localField: "_id",
        foreignField: "article_id",
        as: "likes"
      }
    },
    // 评论
    {
      $lookup: { // 左连接
        from: "comments",
        localField: "_id",
        foreignField: "article_id",
        as: "comments"
      }
    },

    {
      $project: {
        _id: 1,
        title: 1,
        date: 1,
        user: 1,
        nav: 1,
        tags: 1,
        content:1,
        updated:1,
        // user_id: 1,
        likes: 1,
        comments: 1,
        like_size: {
          $size: "$likes"
        },
        comments_size: {
          $size: "$comments"
        }
      }
    }
  ]))[0];
});


const Article = mongoose.model('article', Schema);

// (async () => {
//   const st_t = Date.now();
//   console.log(JSON.stringify(await Article.findAeticleByid({
//     // nav_id: "5cc3d64ea5d0aa06fed13656"
//     // skip: 10
//     id: '5cd12e9ddcbf719419a7da5b'
//   }), 2, 2));
//   // console.log("====>",(await Article.findAeticleByNav_id({
//   //   nav_id: "5cc3d64ea5d0aa06fed13656"
//   // })).length);

//   console.log("===>  ", Date.now() - st_t);
//   setTimeout(() => {
//     process.exit();
//   }, 0);
// })();


module.exports = Article;