require("dotenv").config();
const mongoose = require ("mongoose");
const initData = require ("./data.js");
const Listing = require ("../models/listing.js");

let mongoose_url=process.env.ATLASDB_URL;
main()
.then(()=>{
    console.log("connect to db");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(mongoose_url);
};

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner : "69d03bced0c1d234be6902cc"}))
    await Listing.insertMany(initData.data);
    console.log("data was intilized");
}
initDB();

