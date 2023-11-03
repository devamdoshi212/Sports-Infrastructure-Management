const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
      // set: (value) => (value ? value.setHours(0, 0, 0, 0) : null),
    },
    sportscomplex: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "sportscomplexes",
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
