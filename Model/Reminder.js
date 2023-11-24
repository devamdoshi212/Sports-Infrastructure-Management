const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  date: Date,
  message: String,
  title: String,
  issent: {
    type: Number,
    default: 0,
  },
  userIds: [{ type: mongoose.SchemaTypes.ObjectId, ref: "users" }],
});

module.exports = mongoose.model("reminders", reminderSchema, "reminders");
