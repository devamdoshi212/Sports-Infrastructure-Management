const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  date: Date,
  sportscomplex: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "sportcomplexes",
  },
  enrolls: [
    {
      userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
      entry: Date.now(),
      exit: Date,
    },
  ],
});

module.exports = mongoose.model("sessions", sessionSchema);
