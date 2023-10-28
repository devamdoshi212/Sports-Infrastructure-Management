const mongoose = require('mongoose')

const instructorSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
      createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: "managers" },
      sports: [
        {
          sport: { type: mongoose.SchemaTypes.ObjectId, ref: "sports" },
          timeSlot: [{ from: String, to: String }],
          experience: Number, //in years
        },
      ],
    },
    { timestamps: true }
  );

  module.exports = mongoose.model('instructor',instructorSchema)