const express = require('express');
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
exports.new_post_entry_post = (req, res) => {
  // Toggle for publish to either post for public or keep it internally
  res.send('TODO: Submit new post to save')
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