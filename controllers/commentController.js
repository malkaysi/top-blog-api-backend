const express = require('express');
const router = express.Router();

// Handle comment entry form on get
// May not need this as comment box is shown on front-end under a post entry
exports.new_comment_entry_get = (req, res) => {
  res.send('TODO: Clicking new comment brings you to the new comment page')
}

// Handle comment entry submission on post
exports.new_comment_entry_post = (req, res) => {
  res.send('TODO: Submit new comment to save')
}

// Handle comment entry delete on post
exports.comment_delete_post = (req, res) => {
  res.send('TODO: Delete a comment on post')
}