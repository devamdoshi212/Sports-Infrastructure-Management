const mongoose = require("mongoose");

const SportsComplexSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    latitude: String,
    longitude: String,
    district: { type: mongoose.SchemaTypes.ObjectId, ref: "districts" },
    taluka: String,
    area: String, //in acres
    operationalSince: String,
    sports: [
      {
        sport: { type: mongoose.SchemaTypes.ObjectId, ref: "sports" },
        images: [String],
        rating: {type:Number,default:null},
        fees: String,
        capacity: String,
      },
    ],
    manager: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    // assignedBy: { type: mongoose.SchemaTypes.ObjectId, ref: "authorities" },
    timings: { openingTime: String, closingTime: String },

    picture: {
      type: String,
    },

  },
  { timestamps: true }
);

// SportsComplexSchema.virtual("averageRating").get(function () {
//   if (!this.sports || this.sports.length === 0) {
//     return null;
//   }

//   // Filter out sports without a rating
//   const ratedSports = this.sports.filter((sport) => sport.rating !== null && sport.rating !== undefined);

//   if (ratedSports.length === 0) {
//     return null;
//   }

//   // Calculate the average rating
//   const totalRating = ratedSports.reduce((sum, sport) => sum + sport.rating, 0);
//   return totalRating / ratedSports.length;
// });

// // Ensure virtuals are included in JSON output
// SportsComplexSchema.set("toJSON", { virtuals: true });



module.exports = mongoose.model("sportscomplexes", SportsComplexSchema);
