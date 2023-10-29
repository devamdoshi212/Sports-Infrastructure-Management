const mongoose = require("mongoose");

const SportSchema = new mongoose.Schema({
  SportName: {
    type: String,
    required: [true, "Please Enter Sport name"],
    trim: true,
  },

  Category: {
    type: String,
    required: [true, "Please Enter Category name"],
    trim: true,
  },

  baseUrl: {
    type: String,
  },
},
{ timestamps: true }

);

module.exports = mongoose.model("sports", SportSchema);
