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
  const model = `${category.toUpperCase()}Post`;

  switch (model) {
    case 'STPost':
      STPost.find({})
        .then(posts => res.send(posts))
        .catch(err => console.log(err));
      break;
    case 'TTPost':
      TTPost.find({})
        .then(posts => res.send(posts))
        .catch(err => console.log(err));
      break;
    case 'VGPost':
      VGPost.find({})
        .then(posts => res.send(posts))
        .catch(err => console.log(err));
      break;
    case 'MPPost':
      MPPost.find({})
        .then(posts => res.send(posts))
        .catch(err => console.log(err));
      break;
    default:
      throw new Error('Category does not exist.');
  };
});

// ====== Create topics
router.post('/:category', async (req, res) => {
  const category = req.params.category;
  const model = `${category.toUpperCase()}Post`;
  const sequence = `${category}PostId`;
  const { postContent } = req.body;
  const postId = await getNextPostId(sequence);

  const newTopic = {
    postId, 
    postContent, 
    isTopic: true
  };

  switch (model) {
    case 'STPost':
      STPost.create(newTopic)
        .then(res.send('Post succeeded!'))
        .catch(err => console.log(err));
      break;
    case 'TTPost':
      TTPost.create(newTopic)
        .then(res.send('Post succeeded!'))
        .catch(err => console.log(err));
      break;
    case 'VGPost':
      VGPost.create(newTopic)
        .then(res.send('Post succeeded!'))
        .catch(err => console.log(err));
      break;
    case 'MPPost':
      MPPost.create(newTopic)
        .then(res.send('Post succeeded!'))
        .catch(err => console.log(err));
      break;
    default:
      throw new Error('Category does not exist.');
  };
});

module.exports = router;