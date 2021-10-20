const express = require('express'), 
      router = express.Router();

const { STPost, VGPost, MPPost, DTPost } = require('../models/Post');
const Sequence = require('../models/Sequence');

const initializeApp = async () => {
  let sequence = await Sequence.findOne({ seqName: 'stPostId' });

  if (!sequence) {
    await Sequence.create({ seqName: 'stPostId', seqValue: 0 });
    await Sequence.create({ seqName: 'vgPostId', seqValue: 0 });
    await Sequence.create({ seqName: 'mpPostId', seqValue: 0 });
    await Sequence.create({ seqName: 'dtPostId', seqValue: 0 });
  };
};

const getModel = category => {
  switch (category) {
    case 'st':
      return STPost;
    case 'vg':
      return VGPost;
    case 'mp':
      return MPPost;
    case 'dt':
      return DTPost;
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

initializeApp();

router.get('/', (req, res) => {
  res.send('This is the root route of the API routes!');
});

// ====== Index topics
router.get('/:category', async (req, res) => {
  const { category } = req.params;
  const model = getModel(category);

  try {
    const postsData = await model.find({ isTopic: true });

    const posts = postsData.map(p => ({
      postId: p.postId, 
      timestamp: p.timestamp, 
      author: p.author, 
      postContent: p.postContent, 
      isTopic: p.isTopic, 
      topicChildren: p.topicChildren, 
      topicLatest: p.topicLatest
    }));

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

// ====== Index replies to topic
router.get('/:category/topic/:postId', async (req, res) => {
  const { category, postId: topicId } = req.params;
  const model = getModel(category);
  const parent = await getParent(model, topicId);

  try {
    const postsData = await model.find({ replyParent: parent._id });
    postsData.unshift(parent);

    const posts = postsData.map(p => ({
      postId: p.postId, 
      timestamp: p.timestamp, 
      author: p.author, 
      postContent: p.postContent
    }));

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

module.exports = router;