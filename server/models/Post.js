const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postId: {
    type: Number, 
    required: true
  }, 
  timestamp: {
    type: Date, 
    required: true
  }, 
  author: {
    type: String, 
    default: 'Anonymous', 
    required: true
  }, 
  postContent: {
    type: String, 
    trim: true, 
    required: true
  }, 
  isTopic: Boolean, 
  topicChildren: Number, 
  topicLatest: Date, 
  replyParent: mongoose.ObjectId
});

const STPost = mongoose.model('STPost', PostSchema);
const VGPost = mongoose.model('VGPost', PostSchema);
const MPPost = mongoose.model('MPPost', PostSchema);
const TBPost = mongoose.model('TBPost', PostSchema);

module.exports = {
  STPost, 
  VGPost, 
  MPPost, 
  TBPost
};