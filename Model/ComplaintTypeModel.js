const mongoose = require("mongoose");

const ComplaintTypeSchema = new mongoose.Schema(
  {
    Type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("complainttypes", ComplaintTypeSchema);
