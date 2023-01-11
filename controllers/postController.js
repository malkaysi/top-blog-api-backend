const express = require('express');
const { isEmpty } = require('lodash');
const Post = require('../models/post');
const router = express.Router();

// Handle home page
exports.index = (req, res) => {
  // Display list of published posts
  // Title and author for published posts
}
// Handle post entry form on get
exports.new_post_entry_get = (req, res) => {
  res.send('TODO: Clicking new post brings you to the new post page')
}

// Handle post entry submission on post
exports.new_post_entry_post = (req, res, next) => {
  // Toggle for publish to either post for public or keep it internally
  /* 
  title: { type: String, required: true, maxLength: 15 },
  entry: { type: String, required: true, maxLength: 1000 },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  date_published: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  */

  // Get user Id from the URL
  // Get other fields from the body
  // Send the post to database under post collection
  if (isEmpty(req.body.title)) {
    return res.status(400).json({ error: 'Incorrect post entry information provided' });
  }

  const post = new Post({
    title: req.body.title,
    entry: req.body.entry,
    isPublished: req.body.isPublished,
    date_published: req.body.date_published,
    user: req.params.id,
  });

  post.save((err) => {
    if (err) {
      return next(err)
    };

    return res.json(post)
  })

}

// Handle update post form on get
exports.update_post_entry_get = (req, res) => {
  res.send('TODO: Clicking edit button takes you to the update post entry')
}

// Handle update post form on post
exports.update_post_entry_post = (req, res) => {
  res.send('TODO: Submit updated post to save')
}

// Handle delete post on post
exports.post_entry_delete_post = (req, res) => {
  res.send('TODO: Delete entry on post')
}