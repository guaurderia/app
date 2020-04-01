const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
  {
    dog: { type: Schema.Types.ObjectId, ref: "dog" },
    startTime: { type: Date },
    endTime: { type: Date },
    creator: { type: Schema.Types.ObjectId, ref: "user" }
  },
  {
    timestamps: true
  }
);

const Attendance = mongoose.model("attendance", attendanceSchema);
module.exports = Attendance;
