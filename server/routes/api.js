const express = require('express'),
      router = express.Router();

const { STPost, TTPost, VGPost, MPPost } = require('../models/Post');
const Sequence = require('../models/Sequence');

const getNextPostId = async (seqName) => {
  const updatedPostIdDoc = await Sequence.findOneAndUpdate(
    { seqName }, 
    { $inc: { seqValue: 1 } }, 
    { new: true }
  );

  return updatedPostIdDoc.seqValue;
};

// ====== Index topics
router.get('/:category', (req, res) => {
  const category = req.params.category;

  switch (category) {
    case 'st':
      STPost.find({ isTopic: true })
        .then(posts => res.send(posts))
        .catch(err => console.log(err));
      break;
    case 'tt':
      TTPost.find({ isTopic: true })
        .then(posts => res.send(posts))
        .catch(err => console.log(err));
      break;
    case 'vg':
      VGPost.find({ isTopic: true })
        .then(posts => res.send(posts))
        .catch(err => console.log(err));
      break;
    case 'mp':
      MPPost.find({ isTopic: true })
        .then(posts => res.send(posts))
        .catch(err => console.log(err));
      break;
    default:
      throw new Error('Category does not exist.');
  };
});

// ====== Create topic
router.post('/:category', async (req, res) => {
  const category = req.params.category;
  const sequence = `${category}PostId`;
  const postId = await getNextPostId(sequence);

  const newTopic = {
    postId, 
    postContent: req.body.postContent, 
    author: req.body.postAuthor, 
    isTopic: true
  };

  switch (category) {
    case 'st':
      STPost.create(newTopic)
        .then(res.send('Post succeeded!'))
        .catch(err => console.log(err));
      break;
    case 'tt':
      TTPost.create(newTopic)
        .then(res.send('Post succeeded!'))
        .catch(err => console.log(err));
      break;
    case 'vg':
      VGPost.create(newTopic)
        .then(res.send('Post succeeded!'))
        .catch(err => console.log(err));
      break;
    case 'mp':
      MPPost.create(newTopic)
        .then(res.json('Post succeeded!'))
        .catch(err => console.log(err));
      break;
    default:
      throw new Error('Category does not exist.');
  };
});

// ====== Index replies to topic
router.get('/:category/topic/:postId', (req, res) => {
  const category = req.params.category;
  const postId = req.params.postId;

  switch (category) {
    case 'st':
      STPost.findOne({ postId, isTopic: true })
        .then(post => res.send(post))
        .catch(err => console.log(err));
      break;
    case 'tt':
      TTPost.findOne({ postId, isTopic: true })
        .then(post => res.send(post))
        .catch(err => console.log(err));
      break;
    case 'vg':
      VGPost.findOne({ postId, isTopic: true })
        .then(post => res.send(post))
        .catch(err => console.log(err));
      break;
    case 'mp':
      MPPost.findOne({ postId, isTopic: true })
        .then(post => res.send(post))
        .catch(err => console.log(err));
      break;
    default:
      throw new Error('Topic does not exist.');
  };
});

// ====== Create reply to topic

module.exports = router;