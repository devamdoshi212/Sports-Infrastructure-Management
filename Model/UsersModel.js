const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      // required: [true, "Please Enter your name"],
      trim: true,
    },

    Email: {
      type: String,
      // required: [true, "Please Enter your email"],
      trim: true,
      // validate: [validator.isEmail, "please enter a valid email"],
    },

    Password: {
      type: String,
      trim: true,
    },

    ContactNum: {
      type: String,
      // required: [true, "Please Enter your contactnumber"],
      trim: true,
    },

    DOB: {
      type: String,
      // required: [true, "Please Enter your date of birth"],
    },

    Role: {
      type: Number,
    },

    IsActive: {
      type: Number,
      default: 1,
    },
    notificationtoken: { type: String, default: "" },
    DistrictId: { type: mongoose.SchemaTypes.ObjectId, ref: "districts" },
    SportComplexId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "sportscomplexes",
    },
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
