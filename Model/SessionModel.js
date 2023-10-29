const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    sportscomplex: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "sportcomplexes",
    },
    enrolls: [
      {
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
        entry: Date,
        exit: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("sessions", sessionSchema);
