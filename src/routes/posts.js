const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Post = require('../models/Post');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/',
  auth,
  [
    body('title').trim().isLength({ min: 1 }),
    body('content').trim().isLength({ min: 1 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user.userId
      });

      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);


router.put('/:id',
  auth,
  [
    body('title').trim().isLength({ min: 1 }),
    body('content').trim().isLength({ min: 1 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const post = await Post.findById(req.params.id);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if (post.author.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      post.title = req.body.title;
      post.content = req.body.content;
      post.updatedAt = Date.now();

      await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);


router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;