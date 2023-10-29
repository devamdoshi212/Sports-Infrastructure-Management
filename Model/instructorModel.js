const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    sports: [
      {
        sport: { type: mongoose.SchemaTypes.ObjectId, ref: "Sports" },
        timeSlot: [{ from: String, to: String }],
        experience: Number, //in years
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("instructor", instructorSchema);
