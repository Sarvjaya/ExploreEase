const express = require("express");
const router = express.Router({ mergeParams:true }); //read doc for this parameter
const wrapAsync = require("../utils/wrapAsync.js"); //automatically sends the error to the error-handling middleware
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// POST REVIEW ROUTE
router.post("/",isLoggedIn,validateReview, wrapAsync (reviewController.createReview));

// await Review.findByIdAndDelete(reviewId); lagane se review database se delete ho hi raha hai, lekin agar tum $pull nahi lagate, to Listing document ke andar jo reviews array hai, usme woh review ID reh jayegi.

// DELETE REVIEW ROUTE
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;