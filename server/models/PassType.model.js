const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passTypeSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }, // monthly or daily
    duration: { type: Number, required: true }, // number of months or days
    hours: { type: Number, required: true }, // number of hours determining part-time and full-time
    price: { type: Number, required: true },
    "overtime-rate": { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const PassType = mongoose.model("passType", passTypeSchema);
module.exports = PassType;
