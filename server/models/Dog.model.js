const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dogSchema = new Schema(
  {
    name: { type: String, required: true },
    breed: { type: Object },
    gender: { type: Object, required: true },
    vaccines: Object,
    fixed: { type: Boolean, required: true },
    heat: { had: { type: Boolean }, date: { type: Date } },
    chip: { type: String, required: true },
    character: [Object],
    scan: String,
    creator: { type: Schema.Types.ObjectId, ref: "user" },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const Dog = mongoose.model("dog", dogSchema);
module.exports = Dog;
