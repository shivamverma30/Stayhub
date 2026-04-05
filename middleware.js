const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema, userSignupSchema, userLoginSchema } = require("./schema.js");

const isJsonRequest = (req) => req.xhr || req.originalUrl.startsWith("/api") || req.is("application/json");

const sendValidationError = (req, res, message, redirectPath) => {
  if (isJsonRequest(req)) {
    return res.status(400).json({ success: false, message });
  }
  req.flash("error", message);
  return res.redirect(redirectPath);
};

const trimStringValues = (obj = {}) => {
  const sanitized = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === "string") {
      sanitized[key] = value.trim();
    } else {
      sanitized[key] = value;
    }
  });
  return sanitized;
};

module.exports.isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()){
      //redirecturl save 
      req.session.redirectUrl = req.originalUrl;
    req.flash("error","you must be logged in create listing!");
    return res.redirect("/login");
  }
  next();
};


module.exports.savedRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl;
  }
  next();
};

module.exports.sanitizeAuthInput = (req, res, next) => {
  req.body = trimStringValues(req.body);
  if (typeof req.body.email === "string") {
    req.body.email = req.body.email.toLowerCase();
  }
  next();
};

module.exports.validateSignupInput = (req, res, next) => {
  const { value, error } = userSignupSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    return sendValidationError(req, res, errMsg, "/signup");
  }

  req.body = value;
  next();
};

module.exports.validateLoginInput = (req, res, next) => {
  const { value, error } = userLoginSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    return sendValidationError(req, res, errMsg, "/login");
  }

  req.body = value;
  next();
};

module.exports.isOwner = async(req,res,next)=>{
  let {id}=req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You are not owner of this listing ");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

//validation for listingSchema (middleware)
module.exports.validateListing =(req,res,next)=>{
  let{error}=listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
};

//validation for reviewSchema (middleware)
module.exports.validateReview =(req,res,next)=>{
  let{error}=reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect(`/listings/${id}`);
  }
  if (!review.author || !review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};