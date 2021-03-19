const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postId: Number, 
  postContent: {
    type: String, 
    trim: true
  }, 
  timestamp: Date, 
  isTopic: Boolean, 
  topicCategory: String, 
  postParent: Number
});

module.exports = mongoose.model('Post', PostSchema);