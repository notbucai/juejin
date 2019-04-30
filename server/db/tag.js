const mongoose = require('./db.util');

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  nav_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  }
});

Schema.statics.findByNav_id = async function (nav_id) {
  return await this.find({
    nav_id: mongoose.Types.ObjectId(nav_id)
  });
}

const Tag = mongoose.model('tag', Schema);

module.exports = Tag;