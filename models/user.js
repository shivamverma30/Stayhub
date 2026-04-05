const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
const passportLocalMongoose = require("passport-local-mongoose");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;


const userSchema = new Schema({
    email :{
        type : String,
        required : true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [EMAIL_REGEX, "Invalid email format"],
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);