const express = require('express'),
      router = express.Router();

const Post = require('../models/Post');

const getNextPostId = () => {
  // retreive last post id from db
  // return next post id
};

// ====== Handle add post
router.post('/', (req, res) => {
  // save post to db
});

module.exports = router;