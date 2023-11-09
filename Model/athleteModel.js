const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    SportComplexId: { type: mongoose.SchemaTypes.ObjectId, ref: "sportscomplexes" },
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
    payments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "payments" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("athletes", athleteSchema);
