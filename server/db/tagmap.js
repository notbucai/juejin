const mongoose = require('./db.util');

const Schema = mongoose.Schema({
  article_id: {
    type: mongoose.Types.ObjectId,
    ref: 'articles'
  },
  tag_id: {
    type: mongoose.Types.ObjectId,
    ref: 'tags'
  }
});

const TagMap = mongoose.model('tagMap', Schema);

// (async () => {
//   await new TagMap({
//     tag_id: "5cc5462a81d27d17255a07df",
//     article_id:"5cc660b6423653247ff0b42f"
//   }).save();
//   process.exit();
// })();


module.exports = TagMap;