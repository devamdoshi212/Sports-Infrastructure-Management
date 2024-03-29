const { default: mongoose } = require("mongoose");

const athleteRatingSchema = new mongoose.Schema(
  {
    athleteId: { type: mongoose.SchemaTypes.ObjectId, ref: "athletes" },
    instructorId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    rating: Number,
    sport: { type: mongoose.SchemaTypes.ObjectId, ref: "sports" },
    sportComplex: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "sportscomplexes",
    },
    isEvaluated: { type: Number, default: 0 },
    parameters: [
      {
        parameter: String,
        value: Number,
      },
    ],
    remarks: String,
    supervisorId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("athleteratings", athleteRatingSchema);
