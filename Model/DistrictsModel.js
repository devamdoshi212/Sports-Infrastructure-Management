const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema(
  {
    District: String,
    authorityID: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("districts", DistrictSchema);
