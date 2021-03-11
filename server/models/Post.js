const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postId: {
    type: String
  },
  postContent: {
    type: String
  }
});

module.exports = mongoose.model('Post', PostSchema);