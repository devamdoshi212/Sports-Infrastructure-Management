const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema({
  District: String,
  authorityID: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("District", DistrictSchema);
