const express = require('express'),
      router = express.Router();

const Post = require('../models/Post');

const getNextPostId = () => {
  // 
};

getNextPostId();

// ====== INDEX
router.get('/', (req, res) => {
  Post.find({})
    .then(posts => res.send(posts))
    .catch(err => console.log(err));
});

// ====== CREATE
router.post('/', (req, res) => {
  //
});

module.exports = router;