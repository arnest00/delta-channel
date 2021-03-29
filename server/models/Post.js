const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postId: {
    type: Number, 
    required: true
  }, 
  postContent: {
    type: String, 
    trim: true, 
    required: true
  }, 
  timestamp: {
    type: Date, 
    default: Date.now, 
    required: true
  }, 
  author: {
    type: String, 
    default: 'Anonymous', 
    required: true
  }, 
  isTopic: Boolean, 
  topicChildren: Number, 
  replyParent: mongoose.ObjectId
});

const STPost = mongoose.model('STPost', PostSchema);
const TTPost = mongoose.model('TTPost', PostSchema);
const VGPost = mongoose.model('VGPost', PostSchema);
const MPPost = mongoose.model('MPPost', PostSchema);

module.exports = {
  STPost, 
  TTPost, 
  VGPost, 
  MPPost
};