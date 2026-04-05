const User = require("../models/user");

const isJsonRequest = (req) => req.xhr || req.originalUrl.startsWith("/api") || req.is("application/json");

const sendAuthError = (req, res, message, redirectPath, statusCode = 400) => {
    if (isJsonRequest(req)) {
        return res.status(statusCode).json({ success: false, message });
    }
    req.flash("error", message);
    return res.redirect(redirectPath);
};

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res,next)=>{
    try{
    let { username, email, password } = req.body;
    username = username.trim();
    email = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return sendAuthError(req, res, "Email is already registered", "/signup", 409);
    }

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust1");
        res.redirect("/listings");
    });
    }catch(e){
        return sendAuthError(req, res, e.message, "/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    });
};