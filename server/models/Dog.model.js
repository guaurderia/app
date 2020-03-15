const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dogSchema = new Schema(
  {
    name: { type: String, required: true },
    bread: { type: String, required: true },
    sex: { type: Number, required: true },
    vaccinated: { type: Boolean, required: true },
    fixed: { type: Boolean, required: true },
    last_heat: { type: Date },
    chip: { type: String },
    character: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true
  }
);

const Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;
