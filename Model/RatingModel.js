const ratingSchema = new mongoose.Schema(
    {
        athleteId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
        rating: Number,
        sport: { type: mongoose.SchemaTypes.ObjectId, ref: "sports" },
        sportComplex: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "sportsComplexes",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ratings", ratingSchema);
