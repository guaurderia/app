const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const breedSchema = new Schema(
  {
    name: String,
    "bred-for": [String],
    temperament: [String],
    "height-cm": [Number],
    "weight-kg": [Number],
    "life-expentancy": [Number],
    wikipedia: String,
    origin: String
  },
  {
    timestamps: true
  }
);

const Breed = mongoose.model("breed", breedSchema);
module.exports = Breed;
