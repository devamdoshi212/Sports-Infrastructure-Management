const { default: mongoose } = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    athleteId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    rating: Number,
    remarks: String,
    sport: { type: mongoose.SchemaTypes.ObjectId, ref: "sports" },
    sportComplex: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "sportscomplexes",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ratings", ratingSchema);
