const express=require('express')
const router=express.Router({mergeParams:true})
const Review=require('../models/review')
const wrapAsync=require('../utils/wrapAsync')
const ExpressError=require('../utils/ExpressError')
const {reviewSchema } = require('../schema')
const Listing=require('../models/listing')


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        return next(new ExpressError(msg, 400));
    }
    next();
};

//create review
//post /listings/:id/reviews
router.post('/', validateReview,wrapAsync( async(req,res)=>{
    let listing=await Listing.findById(req.params.id)
    let newReview=new Review(req.body.review)

    listing.reviews.push(newReview)

    await newReview.save()
    await listing.save()
    res.redirect(`/listings/${listing._id}`)

}))

//delete review
router.delete('/:reviewId',wrapAsync(async(req,res)=>{
    let  {id,reviewId}=req.params
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/listings/${id}`)

}))

module.exports=router