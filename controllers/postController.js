const express = require('express');
const { isEmpty } = require('lodash');
const Post = require('../models/post');
const router = express.Router();

// Handle home page
exports.index = (req, res, next) => {
  // Get list of published posts for home page
  Post.find({isPublished: true }, 'title user date_published imageUrl')
    .populate('user', 'first_name last_name name')
    .exec(function (err, publishedPosts) {
      if (err) {
        return next(err)
      }

      return res.json(publishedPosts);
    })
}

// Handle post entry submission on post
exports.new_post_entry_post = (req, res, next) => {
  if (isEmpty(req.body.title)) {
    return res.status(400).json({ error: 'Incorrect post entry information provided' });
  }

  const post = new Post({
    title: req.body.title,
    entry: req.body.entry,
    isPublished: req.body.isPublished,
    date_published: req.body.date_published,
    user: req.params.id,
    imageUrl: req.body.imageUrl ? req.body.imageUrl : 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'
  });

  post.save((err) => {
    if (err) {
      return next(err)
    };

    return res.json(post)
  })

}

// Handle update post form on post
exports.update_post_entry_post = (req, res) => {
  if (isEmpty(req.params.id)) {
    return res.status(400).json({ error: 'Unable to find post' });
  }

  Post.findById(req.params.id)
    .populate("user")
    .exec(function (err, post) {
      if (err) {
        return next(err)
      }

      const existingUserFromPost = post.user.id

      // Check that the user making the request is the owner of the post
      if (req.body.userId !== existingUserFromPost) {
        return res.status(400).json({ error: "Unauthorized" })
      }

        post.title = req.body.title,
        post.entry = req.body.entry,
        post.isPublished = req.body.isPublished,
        post.date_published = req.body.date_published,
        post.user = req.body.userId,
        post._id = req.params.id

      post.save((err) => {
        if (err) {
          return next(err)
        };

        return res.json(post)
      })
    })
}

// Handle delete post on post
exports.post_entry_delete_post = (req, res, next) => {
  if (isEmpty(req.params.id)) {
    return res.status(400).json({ error: 'Unable to find post' });
  }

  Post.findById(req.params.id)
    .populate("user")
    .exec(function (err, post) {
      if (err) {
        return next(err)
      }

      const postUser = post.user.id

      if (req.body.userId !== postUser) {
        return res.status(400).json({ error: "Unauthorized", postUser })
      }


      post.deleteOne();

      return res.json("Post deleted")
    })
}

// Handle blog post detail on get
exports.detailed_blog_post = (req, res, next) => {
  if(isEmpty(req.params.id)) {
    return res.status(400).json({ error: 'Unable to find post' });
  }

  Post.findById(req.params.id)
    .populate("user")
    .exec(function (err, post) {
      if (err) {
        return next(err)
      }

      return res.json(post);
    })
}
