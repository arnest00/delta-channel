const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  topicId: Number,
  topicContent: String,
  topicHome: mongoose.ObjectId
});

module.exports = mongoose.model('Topic', TopicSchema);