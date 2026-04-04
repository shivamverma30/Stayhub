const Listing = require("../models/listing");
const { listingSchema} = require("../schema.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding') ;
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});

const CATEGORY_KEYWORDS = {
  trending: ["trending", "popular", "city", "downtown", "modern", "luxury"],
  room: ["room", "apartment", "studio", "suite", "loft"],
  iconic: ["iconic", "heritage", "historic", "landmark", "district"],
  nature: ["nature", "forest", "mountain", "valley", "retreat"],
  beach: ["beach", "ocean", "sea", "coast", "island"],
  winter: ["winter", "snow", "ski", "alps", "chalet"],
  camping: ["camp", "camping", "cabin", "treehouse", "outdoor"],
  landmarks: ["landmark", "palace", "fort", "museum", "opera"],
  waterfront: ["waterfront", "lake", "river", "canal", "backwater"],
  hotels: ["hotel", "resort", "villa", "bungalow", "hostel"],
};


const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


module.exports.index = async(req,res)=>{
     const searchQuery = (req.query.search || "").trim();
     const selectedCategory = (req.query.category || "").trim().toLowerCase();
     const filters = [];

     // Search by title, location, and country using safe case-insensitive regex.
     if(searchQuery){
      const safeSearch = escapeRegex(searchQuery);
      filters.push({
        $or: [
          { title: { $regex: safeSearch, $options: "i" } },
          { description: { $regex: safeSearch, $options: "i" } },
          { location: { $regex: safeSearch, $options: "i" } },
          { country: { $regex: safeSearch, $options: "i" } },
        ],
      });
     }

     if (selectedCategory && CATEGORY_KEYWORDS[selectedCategory]) {
      const categoryRegex = CATEGORY_KEYWORDS[selectedCategory].join("|");
      filters.push({
        $or: [
          { title: { $regex: categoryRegex, $options: "i" } },
          { description: { $regex: categoryRegex, $options: "i" } },
          { location: { $regex: categoryRegex, $options: "i" } },
          { country: { $regex: categoryRegex, $options: "i" } },
        ],
      });
     }

     const findQuery = filters.length ? { $and: filters } : {};

     const allListings = await Listing.find(findQuery);
     res.render("./listings/index",{allListings, searchQuery, selectedCategory});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new");
};

module.exports.showListing = async(req,res)=>{
    let {id } = req.params;
    const listing = await Listing.findById(req.params.id)
  .populate({
    path: "reviews",
    populate: { path: "author" },
  })
  .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show", { listing });
};

module.exports.createListing = async (req, res,next) => {
  let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1,
}).send();
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = {url, filename};
  newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);    
  req.flash("success","New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing){
    req.flash("error","Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl.replace("/upload","/upload/w_250");
  res.render("listings/edit", { listing ,originalImageUrl});
};


module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(typeof req.file !=="undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = {url, filename};
  await listing.save();
  }
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    req.flash("error", "Listing not found or already deleted.");
    return res.redirect("/listings");
  }
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
