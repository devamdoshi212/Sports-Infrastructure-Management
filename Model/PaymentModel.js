const { default: mongoose } = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    sports: { type: mongoose.SchemaTypes.ObjectId, ref: "sports" },
    athleteId: { type: mongoose.SchemaTypes.ObjectId, ref: "athletes" },
    duration: Number, //months
    instructorId: { type: mongoose.Schema.ObjectId, ref: "instructors" },
    paymentTakenBy: { type: mongoose.Schema.ObjectId, ref: "users" },
    timeSlot: { from: String, to: String },
    from: Date,
    sportsComplexId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "sportscomplexes",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("payments", paymentSchema);
