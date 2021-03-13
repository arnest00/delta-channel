const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postId: Number,
  postContent: String
});

module.exports = mongoose.model('Post', PostSchema);