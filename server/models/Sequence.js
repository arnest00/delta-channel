const mongoose = require('mongoose');

const SequenceSchema = new mongoose.Schema({
  seqName: String,
  seqValue: Number
});

module.exports = mongoose.model('Sequence', SequenceSchema);