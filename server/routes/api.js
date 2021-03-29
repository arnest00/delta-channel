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
    isTopic: true, 
    topicChildren: 0
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
  const topicId = req.params.postId;

  switch (category) {
    case 'st':
      STPost.findOne({ postId: topicId, isTopic: true })
        .then(fetchedParent => {
          STPost.find({ replyParent: fetchedParent._id })
            .then(posts => {
              console.log(fetchedParent);
              res.send(posts);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
      break;
    case 'tt':
      //
      break;
    case 'vg':
      //
      break;
    case 'mp':
      MPPost.findOne({ postId: topicId, isTopic: true })
        .then(fetchedParent => {
          MPPost.find({ replyParent: fetchedParent._id })
            .then(posts => {
              posts.unshift(fetchedParent);
              res.send(posts);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
      break;
    default:
      throw new Error('Topic does not exist.');
  };
});

// ====== Create reply to topic
router.post('/:category/topic/:postId', async (req, res) => {
  const category = req.params.category;
  const topicId = req.params.postId;
  const sequence = `${category}PostId`;
  const postId = await getNextPostId(sequence);
  let fetchedParent;

  const newReply = {
    postId, 
    postContent: req.body.postContent, 
    author: req.body.postAuthor
  };

  switch (category) {
    case 'st':
      fetchedParent = await STPost.findOneAndUpdate(
        { postId: topicId, isTopic: true }, 
        { $inc: {topicChildren: 1} }, 
        { new: true }
      );
      newReply.replyParent = fetchedParent._id;
      
      STPost.create(newReply)
        .then(res.send('Post succeeded!'))
        .catch(err => console.log(err));
      
      break;
    case 'tt':
      fetchedParent = await TTPost.findOneAndUpdate(
        { postId: topicId, isTopic: true }, 
        { $inc: {topicChildren: 1} }, 
        { new: true }
      );
      newReply.replyParent = fetchedParent._id;

      TTPost.create(newReply)
        .then(res.send('Post succeeded!'))
        .catch(err => console.log(err));

      break;
    case 'vg':
      fetchedParent = await VGPost.findOneAndUpdate(
        { postId: topicId, isTopic: true }, 
        { $inc: {topicChildren: 1} }, 
        { new: true }
      );
      newReply.replyParent = fetchedParent._id;

      VGPost.create(newReply)
        .then(res.send('Post succeeded!'))
        .catch(err => console.log(err));

      break;
    case 'mp':
      fetchedParent = await MPPost.findOneAndUpdate(
        { postId: topicId, isTopic: true }, 
        { $inc: {topicChildren: 1} }, 
        { new: true }
      );
      newReply.replyParent = fetchedParent._id;

      MPPost.create(newReply)
        .then(res.json('Post succeeded!'))
        .catch(err => console.log(err));

      break;
    default:
      throw new Error('Topic does not exist.');
  };
});

module.exports = router;