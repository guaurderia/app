const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passSchema = new Schema(
  {
    dog: { type: Schema.Types.ObjectId, ref: "dog", required: true },
    passType: { type: Schema.Types.ObjectId, ref: "passType", required: true },
    "purchase-date": { type: Date, required: true },
    "start-date": Date,
    "duration-expires": Date,
    "count-remaining": Number,
    creator: { type: Schema.Types.ObjectId, ref: "user", required: true }
  },
  {
    timestamps: true
  }
);

const Pass = mongoose.model("pass", passSchema);
module.exports = Pass;
