const express = require('express'),
      router = express.Router();

const Post = require('../models/Post');
const Sequence = require('../models/Sequence');

const getNextPostId = async () => {
  const updatedPostIdDoc = await Sequence.findOneAndUpdate(
    { seqName: 'postId' }, 
    { $inc: { seqValue: 1 } }, 
    { new: true }
  );

  return updatedPostIdDoc.seqValue;
};

// ====== INDEX
router.get('/', (req, res) => {
  Post.find({})
    .then(posts => res.send(posts))
    .catch(err => console.log(err));
});

// ====== CREATE
router.post('/', async (req, res) => {
  const { postContent } = req.body;
  const postId = await getNextPostId();

  const newPost = {
    postId,
    postContent
  };

  Post.create(newPost)
    .then(res.send('Post succeeded!'))
    .catch(err => console.log(err));
});

module.exports = router;