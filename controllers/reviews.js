const Listing=require('../models/listing')
const Review=require('../models/review')

module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id)
    let newReview=new Review(req.body.review)
    newReview.author=req.user._id
    console.log(req.user._id)

    listing.reviews.push(newReview)

    await newReview.save()
    await listing.save()
    req.flash('success','New Review Created!')
    res.redirect(`/listings/${listing._id}`)

}

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    //  Step 1: Review find karo
    const review = await Review.findById(reviewId);

    //  Step 2: Authorization check
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not allowed to delete this review");
        return res.redirect(`/listings/${id}`);
    }

    //  Step 3: Listing se reference hatao
    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

    //  Step 4: Review delete karo
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Review Deleted!');
    res.redirect(`/listings/${id}`);
};