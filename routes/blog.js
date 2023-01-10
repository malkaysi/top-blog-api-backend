const express = require("express");
const router = express.Router();

// Require controller modules
const auth_controller = require("../controllers/authController");

// AUTH ROUTES //

// Post request for logging in 
router.post("/login", auth_controller.login_post);

// Post request to logout
router.post("/logout", auth_controller.logout_post);

// Post request to signup
router.post("/signup", auth_controller.signup_post);

module.exports = router;
