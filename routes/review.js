const express=require('express')
const router=express.Router({mergeParams:true})
const Review=require('../models/review')
const wrapAsync=require('../utils/wrapAsync')
const Listing=require('../models/listing')
const{validateReview, isLoggedIn,isReviewAuthor}=require('../middleware')
const reviewController=require('../controllers/reviews')

router.post(
    '/',
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
)

//delete review
router.delete(
    '/:reviewId'
    ,isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
)

module.exports=router