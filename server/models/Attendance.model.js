const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
  {
    dog: { type: Schema.Types.ObjectId, ref: "dog", required: true },
    startTime: { type: Date },
    endTime: { type: Date },
    confirmed: Boolean,
    creator: { type: Schema.Types.ObjectId, ref: "user" }
  },
  {
    timestamps: true
  }
);

const Attendance = mongoose.model("attendance", attendanceSchema);
module.exports = Attendance;
