const mongoose = require("mongoose")
require('dotenv').config()

const {MONGO_URI} = process.env

module.exports.getDbConnetion = function(){
    mongoose.connect(MONGO_URI).then(()=>console.log("DB connected")).catch((err)=>{
        console.log(err);
    })
}