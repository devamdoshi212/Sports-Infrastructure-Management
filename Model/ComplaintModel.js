const { default: mongoose } = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        type: String, //Resource Request, Maintenance Requirement
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
        sportsComplex: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "sportsComplexes",
        },
        level: Number, //0 - Supervisor, 1 - Manager, 2 - Authority, 3 - Admin
        status: Number, //0 - Active(Not Solved), 1 - Solved
    },
    { timestamps: true }
);

module.exports = mongoose.model("Complaints", complaintSchema);
