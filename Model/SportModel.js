const mongoose = require("mongoose");


const SportSchema = new mongoose.Schema({

    SportName:{
        type:String,
        required: [true, "Please Enter Sport name"],
        trim: true,
    },

  
    Category:{
        type:String,
        required: [true, "Please Enter Category name"],
        trim: true,

    }
  
})

module.exports = mongoose.model("Sport",SportSchema)