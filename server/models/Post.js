const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postId: Number, 
  postContent: {
    type: String, 
    trim: true
  }, 
  timestamp: Date
});

module.exports = mongoose.model('Post', PostSchema);