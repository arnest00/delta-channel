const express = require('express'), 
      router = express.Router();

const { STPost, VGPost, MPPost, TBPost } = require('../models/Post');
const Sequence = require('../models/Sequence');

const getModel = category => {
  switch (category) {
    case 'st':
      return STPost;
    case 'vg':
      return VGPost;
    case 'mp':
      return MPPost;
    case 'tb':
      return TBPost;
    default:
      throw new Error('Category does not exist.');
  };
};

const getNextPostId = async (seqName) => {
  let updatedPostIdDoc;

  try {
    updatedPostIdDoc = await Sequence.findOneAndUpdate(
      { seqName }, 
      { $inc: { seqValue: 1 } }, 
      { new: true }
    );
  } catch (e) {
    throw new Error('Sequence does not exist.');
  };

  return updatedPostIdDoc.seqValue;
};

const getParent = async (model, postId) => {
  let fetchedParent;

  try {
    fetchedParent = await model.findOne({ postId });
  } catch (e) {
    throw new Error('Topic does not exist.');
  };

  return fetchedParent;
};

router.get('/', (req, res) => {
  res.send('This is the root route of the API routes!');
});

// ====== Index topics
router.get('/:category', async (req, res) => {
  const { category } = req.params;
  const model = getModel(category);

  try {
    const posts = await model.find({ isTopic: true });
    res.send(posts);
  } catch (e) {
    throw new Error('Could not retrieve topics.');
  };
});

// ====== Create topic
router.post('/:category', async (req, res) => {
  const { category } = req.params;
  const model = getModel(category);
  const sequence = `${category}PostId`;
  const postId = await getNextPostId(sequence);
  const timestamp = new Date().toISOString();

  const newTopic = {
    postId, 
    timestamp, 
    author: req.body.postAuthor, 
    postContent: req.body.postContent, 
    isTopic: true, 
    topicChildren: 0, 
    topicLatest: timestamp
  };

  try {
    await model.create(newTopic);
    res.send('Post succeeded!');
  } catch (e) {
    throw new Error('Could not post topic.');
  };
});

// ====== Delete topic and replies
// router.delete('/:category/topic/:postId', async (req, res) => {
//   const { category, postId } = req.params;
//   const model = getModel(category);
//   const parent = await getParent(model, postId);

//   try {
//     await model.deleteMany({ replyParent: parent._id });
//     await model.deleteOne({ postId: postId });
//     res.send('Deletion succeeded!')
//   } catch (e) {
//     throw new Error('Could not delete topic and its replies.');
//   };
// });

// ====== Index replies to topic
router.get('/:category/topic/:postId', async (req, res) => {
  const { category, postId: topicId } = req.params;
  const model = getModel(category);
  const parent = await getParent(model, topicId);

  try {
    const posts = await model.find({ replyParent: parent._id });
    posts.unshift(parent);
    res.send(posts);
  } catch (e) {
    throw new Error('Could not retreive replies.');
  };
});

// ====== Create reply to topic
router.post('/:category/topic/:postId', async (req, res) => {
  const { category, postId: topicId } = req.params;
  const model = getModel(category);
  const parent = await getParent(model, topicId);
  const sequence = `${category}PostId`;
  const postId = await getNextPostId(sequence);
  const timestamp = new Date().toISOString();

  const newReply = {
    postId, 
    timestamp, 
    author: req.body.postAuthor, 
    postContent: req.body.postContent, 
    replyParent: parent._id
  };

  try {
    await model.create(newReply);
    await model.findOneAndUpdate(
      { postId: topicId, isTopic: true }, 
      { $inc: {topicChildren: 1}, $set: { topicLatest: timestamp } }
    );
    res.send('Post succeeded!');
  } catch (e) {
    throw new Error('Could not post reply.')
  };
});

// ====== Delete reply
// router.delete('/:category/topic/:postId/:replyId', async (req, res) => {
//   const { category, postId, replyId } = req.params;
//   const model = getModel(category);

//   try {
//     await model.findOneAndDelete(
//       { postId: replyId }
//     );
//     await model.findOneAndUpdate(
//       { postId, isTopic: true }, 
//       { $inc: {topicChildren: -1} }
//     );
//     res.send('Deletion succeeded!');
//   } catch (e) {
//     throw new Error('Could not delete reply.');
//   };
// });

// res.status(500).send('An error occurred.')

module.exports = router;