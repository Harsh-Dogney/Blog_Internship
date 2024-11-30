const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const postId = req.query.post_id;
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const comments = await Comment.find({ post: postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/',
  auth,
  [
    body('content').trim().isLength({ min: 1 }),
    body('postId').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const post = await Post.findById(req.body.postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const comment = new Comment({
        content: req.body.content,
        post: req.body.postId,
        author: req.user.userId
      });

      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);


router.put('/:id',
  auth,
  [body('content').trim().isLength({ min: 1 })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const comment = await Comment.findById(req.params.id);
      
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      if (comment.author.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      comment.content = req.body.content;
      await comment.save();
      
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);


router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;