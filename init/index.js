const mongoose = require ("mongoose");
const initData = require ("./data.js");
const Listing = require ("../models/listing.js");

let mongoose_url="mongodb://127.0.0.1:27017/wanderlust";
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
    initData.data = initData.data.map((obj)=>({...obj,owner : "6843ea05ec73febe4dfe3349"}))
    await Listing.insertMany(initData.data);
    console.log("data was intilized");
}
initDB();

