const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passSchema = new Schema(
  {
    dog: { type: Schema.Types.ObjectId, ref: "Dog" },
    passType: { type: Schema.Types.ObjectId, ref: "PassType" },
    purchase_date: { type: Date },
    duration_expires: { type: Date },
    count_remaining: { type: Number }
  },
  {
    timestamps: true
  }
);

const Pass = mongoose.model("PassType", passSchema);
module.exports = Pass;
