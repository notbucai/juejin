const mongoose = require('./db.util');

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  }
});

Schema.static('findArticles', async function ({
  id,
}) {
  // console.log(await this.find());

  return await this.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      }
    },
    {
      $lookup: { // 左连接
        from: "articles",
        localField: "_id",
        foreignField: "nav_id",
        as: "articles"
      }
    },
    {
      $lookup: { // 左连接
        from: "tags",
        localField: "articles._id",
        foreignField: "article_id",
        as: "tags"
      }
    },

    // {
    //   $lookup: { // 左连接
    //     from: "tags",
    //     localField: "_id",
    //     foreignField: "nav_id",
    //     as: "tags"
    //   }
    // },
    // {
    //   $lookup: { // 左连接
    //     from: "tagmaps",
    //     localField: "tags._id",
    //     foreignField: "tag_id",
    //     as: "tagmaps"
    //   }
    // },
    // {
    //   $lookup: { // 左连接
    //     from: "articles",
    //     localField: "tagmaps.article_id",
    //     foreignField: "_id",
    //     as: "articles"
    //   }
    // },

  ]);
});

const Nav = mongoose.model('nav', Schema);

// (async () => {
//   console.log(JSON.stringify(await Nav.findArticles({
//     id: "5cc3d64ea5d0aa06fed13656"
//   }), 2, 2));
//   setTimeout(() => {
//     process.exit();
//   }, 100);
// })();

module.exports = Nav;