const express = require("express");
const router = express.Router();
const passport = require('passport');

const auth_controller = require("../controllers/authController");
const auth = require("../auth")

// AUTH ROUTES //

// Get request for login form
router.get("/login", auth_controller.login_get);

// Post request for logging in 
router.post("/login", auth_controller.login_post);

// Post request to logout
router.post("/logout", auth.required, auth_controller.logout_post);

// Post request to signup
router.post("/signup", auth_controller.signup_post);