const express = require("express");
const router = express.Router();
const passport = require('passport');
const auth = require("../auth")

// Require controller modules
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

// Don't think we need this if we're displaying through the front-end
router.get('/', post_controller.index);

// USER ROUTES //
router.get("/profile/:id", auth.required, user_controller.profile_get);

// POST ROUTES //

// Post request to submit a new blog entry
router.post("/user/:id/post", auth.required, post_controller.new_post_entry_post);

// Put request to update a blog entry
router.put("/post/:id/update", auth.required, post_controller.update_post_entry_post);

// Post request to delete a blog entry
router.post("/post/:id/delete", auth.required, post_controller.post_entry_delete_post);

// COMMENT ROUTES //

// Post request to create a comment on blog post
router.post("/post/:id/comment", auth.required, comment_controller.new_comment_entry_post);

// Post request to delete a comment on a blog post
router.post("/post/:id/comment/:id", auth.required, comment_controller.comment_delete_post);


// Don't need a post list get because they'll be displayed on the home page
module.exports = router;
