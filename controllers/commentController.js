const express = require('express');
const isEmpty = require('lodash/isEmpty')
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user')

// Handle comment entry form on get
// May not need this as comment box is shown on front-end under a post entry
exports.new_comment_entry_get = (req, res) => {
  res.send('TODO: Clicking new comment brings you to the new comment page')
}

// Handle comment entry submission on post
exports.new_comment_entry_post = (req, res, next) => {
  if (isEmpty(req.params.id) || isEmpty(req.user)) {
    return res.status(400).json({ error: 'Unable to find post or user' });
  }

  User.findById(req.user.id)
    .exec(function (err, user) {
      if (err) {
        return next(err)
      }

      const comment = new Comment({
        entry: req.body.entry,
        data_published: req.body.date_published,
        post: req.params.id,
        user,
      })

      comment.save((err) => {
        if (err) {
          return next(err)
        }
    
        return res.json(comment)
      })
    });
}

// Handle comment entry delete on post
exports.comment_delete_post = (req, res, next) => {
  Comment.findByIdAndDelete(req.params.commentId, function (err) {
    if(err) {
      return next(err)
    };

    return res.json("Comment deleted")
  });

}