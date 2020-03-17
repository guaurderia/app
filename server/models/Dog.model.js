const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dogSchema = new Schema(
  {
    name: { type: String, required: true },
    bread: { type: String, required: true },
    sex: { type: Number, required: true },
    vaccines: { rabies: { type: Boolean }, parvovirus: { type: Boolean }, hepatitis: { type: Boolean }, distemper: { type: Boolean } },
    fixed: { type: Boolean, required: true },
    heat: { had: { type: Boolean }, date: { type: Date } },
    chip: { type: String },
    character: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pass: [{ type: Schema.Types.ObjectId, ref: "Pass" }]
  },
  {
    timestamps: true
  }
);

const Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;
