const express = require('express'), 
      router = express.Router();

const { STPost, VGPost, MPPost, TBPost } = require('../models/Post');
const Sequence = require('../models/Sequence');

const getNextPostId = async (seqName) => {
  const updatedPostIdDoc = await Sequence.findOneAndUpdate(
    { seqName }, 
    { $inc: { seqValue: 1 } }, 
    { new: true }
  );

  return updatedPostIdDoc.seqValue;
};

router.get('/', (req, res) => {
  res.send('This is the root route of the API routes!');
});

// ====== Index topics
router.get('/:category', (req, res) => {
  const category = req.params.category;

  switch (category) {
    case 'st':
      STPost.find({ isTopic: true })
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
    case 'tb':
      TBPost.find({ isTopic: true })
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
  const timestamp = new Date().toISOString();

  const newTopic = {
    postId, 
    postContent: req.body.postContent, 
    timestamp, 
    author: req.body.postAuthor, 
    isTopic: true, 
    topicChildren: 0, 
    topicLatest: timestamp
  };

  switch (category) {
    case 'st':
      STPost.create(newTopic)
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
    case 'tb':
      TBPost.create(newTopic)
        .then(res.send('Post succeeded!'))
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
              posts.unshift(fetchedParent);
              res.send(posts);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
      break;
    case 'vg':
      VGPost.findOne({ postId: topicId, isTopic: true })
        .then(fetchedParent => {
          VGPost.find({ replyParent: fetchedParent._id })
            .then(posts => {
              posts.unshift(fetchedParent);
              res.send(posts);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
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
    case 'tb':
      TBPost.findOne({ postId: topicId, isTopic: true })
        .then(fetchedParent => {
          TBPost.find({ replyParent: fetchedParent._id })
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
  const timestamp = new Date().toISOString();
  let fetchedParent;

  const newReply = {
    postId, 
    postContent: req.body.postContent, 
    timestamp, 
    author: req.body.postAuthor
  };

  switch (category) {
    case 'st':
      fetchedParent = await STPost.findOneAndUpdate(
        { postId: topicId, isTopic: true }, 
        { $inc: {topicChildren: 1}, $set: { topicLatest: timestamp } }, 
        { new: true }
      );
      newReply.replyParent = fetchedParent._id;
      
      STPost.create(newReply)
        .then(res.send('Post succeeded!'))
        .catch(err => console.log(err));
      
      break;
    case 'vg':
      fetchedParent = await VGPost.findOneAndUpdate(
        { postId: topicId, isTopic: true }, 
        { $inc: {topicChildren: 1}, $set: { topicLatest: timestamp } }, 
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
        { $inc: {topicChildren: 1}, $set: { topicLatest: timestamp } }, 
        { new: true }
      );
      newReply.replyParent = fetchedParent._id;

      MPPost.create(newReply)
        .then(res.json('Post succeeded!'))
        .catch(err => console.log(err));

      break;
    case 'tb':
      fetchedParent = await TBPost.findOneAndUpdate(
        { postId: topicId, isTopic: true }, 
        { $inc: {topicChildren: 1}, $set: { topicLatest: timestamp } }, 
        { new: true }
      );
      newReply.replyParent = fetchedParent._id;

      TBPost.create(newReply)
        .then(res.json('Post succeeded!'))
        .catch(err => console.log(err));

      break;
    default:
      throw new Error('Topic does not exist.');
  };
});

module.exports = router;