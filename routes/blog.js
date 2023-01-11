const express = require("express");
const router = express.Router();
const passport = require('passport');

// Require controller modules
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

// Don't think we need this if we're displaying through the front-end
router.get('/', post_controller.index);

// USER ROUTES //
router.get("/profile/:id", user_controller.profile_get);

// POST ROUTES //

// Get request for blog post form
router.get("/post", post_controller.new_post_entry_get);

// Post request to submit a new blog entry
router.post("/post", post_controller.new_post_entry_post);

// Post request to delete a blog entry
router.post("/post/:id/delete", post_controller.post_entry_delete_post);

// Don't need a post list get because they'll be displayed on the home page
module.exports = router;
