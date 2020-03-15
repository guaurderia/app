const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passTypeSchema = new Schema(
  {
    name: { type: String },
    price: { type: Number },
    duration: { type: Date },
    count: { type: Number }
  },
  {
    timestamps: true
  }
);

const PassType = mongoose.model("PassType", passTypeSchema);
module.exports = PassType;
