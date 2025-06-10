
//we have different diff listing ( 1 to m relationship) we added a array in listing of review system 

const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const reviewSchema = new Schema({
    comment : String ,
    rating :{
        type :Number ,
        min :1,
        max :5,
    },
    crearedAt : {
        type : Date,
        default : Date.now(),
    },
    author :{
        type : Schema.Types.ObjectId,
        ref : "User",
    },
});

module.exports = mongoose.model("Review", reviewSchema);