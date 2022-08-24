const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST api/posts
// @desc Test route
// @access Public
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select(['-password']);

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route Get api/posts
// @desc Get all posts
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route Get api/posts/:id
// @desc Get post by post id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status('404').json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route DELETE api/posts/:id
// @desc Delete post by post id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(req);
    if (!post) {
      return res.status('404').json({ msg: 'Post not found' });
    }
    //console.log(post);
    let writer = await post.user.toString();
    console.log('writer ' + writer);
    let user = await User.findById(req.user.id).select('-password');

    user = user._id.toString();
    console.log('user ' + user);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (user != writer) {
      return res
        .status(401)
        .json({ msg: 'Only the author can delete their posts' });
    }

    if (user === writer) {
      console.log('yay');
      await post.remove();
      res.json({ msg: 'Post deleted' });
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route PUT api/posts/like/:id
// @desc Like a post
// @access Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    console.log('poop');
    const post = await Post.findById(req.params.id);
    console.log(post);

    //Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
