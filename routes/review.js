const express = require("express");
const router = express.Router({mergeParams : true});  //{mergeParams : true} this is using because listing se reviewId nhi aa rhi thi isme 
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor}= require("../middleware.js");
const reviewControlleer = require("../controllers/reviews.js");


//post review route 
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewControlleer.createReview));

//Delete review route 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewControlleer.destroyReview));

module.exports = router;