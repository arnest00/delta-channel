const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postId: Number,
  postContent: String,
  postParent: mongoose.ObjectId
});

module.exports = mongoose.model('Post', PostSchema);