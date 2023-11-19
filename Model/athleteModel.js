const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    SportComplexId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "sportscomplexes",
    },
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    bloodGroup: String,
    disability: Number,
    healthIssue: String,
    isApproved: Number,
    isActive: Number,
    address: String,
    emergencyNumber: String,
    baseUrl: {
      type: String,
    },
    goals: [
      {
        title: String,
        description: String,
        startdate: {
          type: Date,
          default: Date.now(),
        },
        targetdate: Date, //useful for reminder
        actualdate: Date,
        achieved: {
          type: String,
          default: "0",
        },
      },
    ],
    payments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "payments" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("athletes", athleteSchema);
