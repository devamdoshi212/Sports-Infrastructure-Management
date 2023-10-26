const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Please Enter your name"],
    trim: true,
  },

  Email: {
    type: String,
    required: [true, "Please Enter your email"],
    trim: true,
    unique: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },

  Password: {
    type: String,
    require: true,
    minlength: 8,
    trim: true,
  },

  ContactNum: {
    type: String,
    required: [true, "Please Enter your contactnumber"],
    require: true,
    trim: true,
  },

  DOB: {
    type: Date,
    required: [true, "Please Enter your date of birth"],
    require: true,
  },

  Role:{
    type:Number
  },

  IsActive: {
    type: Number,
    default: 1,
  },

  DistrictId: { type: mongoose.SchemaTypes.ObjectId, ref: "districts" },
  createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: "Users" },

  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UserSchema);
