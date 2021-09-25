const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');

const Campground = require('../models/campground');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
