const Listing = require("../models/listing")
const { cloudinary } = require("../cloudConfig");

module.exports.index=async (req,res)=>{
    let allListings=await Listing.find({})
    res.render("listings/index",{allListings})
}

module.exports.renderNewForm=async (req,res)=>{
    res.render("listings/new")
}

module.exports.showListing=async (req,res)=>{
    let {id}=req.params
    let listing=await Listing.findById(id).populate({path:'reviews', populate:{path:"author"}}).populate('owner')
if (!listing) {
    req.flash("error", "Listing not found!");
    return res.status(404).redirect("/listings");
}
    console.log(listing)
    res.render('listings/show',{listing})
}

module.exports.createListing=async (req, res,next) => { 
    let url=req.file.path
    let filename=req.file.filename

    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id
    newListing.image={url,filename}
    await newListing.save();
    req.flash('success','New Listing Created!')
    res.redirect('/listings');
}

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params
    let listing=await Listing.findById(id)
    if (!listing) {
    req.flash("error", "Listing not found!");
    return res.status(404).redirect("/listings");
}
    let orignalImageUrl=listing.image.url;
    orignalImageUrl=orignalImageUrl.replace("/upload","/upload/w_250")
    res.render('listings/edit',{listing,orignalImageUrl})
}

module.exports.updateListing=async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename}
        await listing.save()
    }

    req.flash('success','Listing Updated!')
    res.redirect(`/listings/${id}`);
}


module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if (listing.image && listing.image.filename) {
        await cloudinary.uploader.destroy(listing.image.filename);
    }

    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Deleted from DB:", deletedListing);

    req.flash('success', 'Listing Deleted!');
    res.redirect('/listings');
};