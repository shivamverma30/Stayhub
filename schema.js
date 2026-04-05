const Joi = require("joi");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

// For listing validation server-side 
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),        
    description: Joi.string().required(),   
    location: Joi.string().required(),      
    country: Joi.string().required(),      
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null)
  }).required()
});




//for validation of server side 
module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});

module.exports.userSignupSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters long",
  }),
  email: Joi.string().trim().lowercase().pattern(EMAIL_REGEX).required().messages({
    "string.empty": "Email is required",
    "string.pattern.base": "Invalid email format",
  }),
  password: Joi.string().pattern(STRONG_PASSWORD_REGEX).required().messages({
    "string.empty": "Password is required",
    "string.pattern.base": "Password must contain uppercase, lowercase, number and special character.",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match password",
    "string.empty": "Confirm password is required",
  }),
  mobile: Joi.string().trim().allow("").optional().pattern(INDIAN_MOBILE_REGEX).messages({
    "string.pattern.base": "Mobile number must be a valid 10-digit Indian number starting with 6, 7, 8, or 9",
  }),
});

module.exports.userLoginSchema = Joi.object({
  username: Joi.string().trim().required().messages({
    "string.empty": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

module.exports.authRegex = {
  EMAIL_REGEX,
  STRONG_PASSWORD_REGEX,
  INDIAN_MOBILE_REGEX,
};