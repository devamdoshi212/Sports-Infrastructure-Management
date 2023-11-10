const { default: mongoose } = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        type: { type: mongoose.SchemaTypes.ObjectId, ref: "complainttypes" }, // , Maintenance Requirement
        Description: String,
        photo: String,
        // Sremarks: String,
        // Mremarks: String,
        // Aremarks: String,
        remarks: [
            {
                level: Number,
                userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" }, //kone complain joyi
                remark: String,
                date:Date,
            },
        ],
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" }, //kone complain kari
        sportsComplex: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "sportscomplexes",
        },
        level: Number, //0 - Supervisor, 1 - Manager, 2 - Authority, 3 - Admin
        status: Number, //0 - Active(Not Solved), 1 - Solved
    },

    { timestamps: true }
);

module.exports = mongoose.model("Complaints", complaintSchema);
