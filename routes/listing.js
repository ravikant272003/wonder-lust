const express=require('express')
const router=express.Router()
const Listing=require('../models/listing')
const wrapAsync=require('../utils/wrapAsync')
const ExpressError=require('../utils/ExpressError')
const { listingSchema } = require('../schema')


const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        return next(new ExpressError(msg, 400));
    }
    next();
};

//index route
router.get('/',wrapAsync(async (req,res)=>{
    let allListings=await Listing.find({})
    res.render("listings/index",{allListings})
}))

//new listings
router.get('/new',wrapAsync(async (req,res)=>{
    res.render("listings/new")
}))

//show listing route
router.get('/:id',wrapAsync(async (req,res)=>{
    let {id}=req.params
    let listing=await Listing.findById(id).populate('reviews')
    res.render('listings/show',{listing})
}))

//create listing
router.post('/',validateListing,wrapAsync(async (req, res,next) => {
    let data = req.body.listing;
    // 🧩 Image check + default set karna
    if (!data.image || !data.image.url || data.image.url.trim() === "") {
      data.image = {
        filename: "defaultimage",
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
      };
    }

    // 🧠 Save new listing
    const newListing = new Listing(data);
    await newListing.save();

    // ✅ Redirect to all listings page
    res.redirect('/listings');
}));


//edit listing
router.get('/:id/edit',wrapAsync(async (req,res)=>{
    let {id}=req.params
    let listing=await Listing.findById(id)
    res.render('listings/edit',{listing})
}))

//update listing
// router.put('/:id',async (req,res)=>{
//     let {id}=req.params
//     await Listing.findByIdAndUpdate(id,{...req.body.listing})
//     res.redirect(`/listings/${id}`)
// })
router.put('/:id',validateListing,wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  // form se aaya data
  let updatedData = req.body.listing;

  // agar image url empty nahi hai, tabhi update karo
  if (updatedData.image && updatedData.image.url) {
    listing.image = updatedData.image; // naya image laga do
  }

  // baki fields update kar do
  listing.title = updatedData.title;
  listing.description = updatedData.description;
  listing.price = updatedData.price;
  listing.location = updatedData.location;
  listing.country = updatedData.country;

  await listing.save();
  res.redirect(`/listings/${id}`);
}));


//delete listing
router.delete('/:id',wrapAsync(async (req,res)=>{
    let {id}=req.params
    let deletedlisting=await Listing.findByIdAndDelete(id)
    console.log(deletedlisting)
    res.redirect('/listings')
}))


module.exports=router