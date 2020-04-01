const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passTypeSchema = new Schema(
  {
    name: { type: String, required: true },
    subscription: { type: Boolean, required: true },
    price: { type: Number, required: true },
    duration: { type: Date },
    count: { type: Number }
  },
  {
    timestamps: true
  }
);

const PassType = mongoose.model("passType", passTypeSchema);
module.exports = PassType;
