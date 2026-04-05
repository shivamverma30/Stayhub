const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { savedRedirectUrl, sanitizeAuthInput, validateSignupInput, validateLoginInput } = require("../middleware.js");
const userController = require("../controllers/user.js");


//SignUp page 
router.route("/signup")
.get(userController.renderSignupForm)
.post(sanitizeAuthInput, validateSignupInput, wrapAsync(userController.signup));

//login page 
router.route("/login")
.get(userController.renderLoginForm)
.post(sanitizeAuthInput, validateLoginInput, savedRedirectUrl, passport.authenticate("local", { failureRedirect : "/login", failureFlash: true }), userController.login);


//logout
router.get("/logout",userController.logout);



module.exports = router;