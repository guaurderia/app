const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dogSchema = new Schema(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    sex: { type: String, required: true },
    vaccines: { rabies: { type: Boolean }, parvovirus: { type: Boolean }, hepatitis: { type: Boolean }, distemper: { type: Boolean } },
    fixed: { type: Boolean, required: true },
    heat: { had: { type: Boolean }, date: { type: Date } },
    chip: { type: String, required: true },
    character: { type: String },
    scan: { type: Number },
    creator: { type: Schema.Types.ObjectId, ref: "user" },
    owner: { type: Schema.Types.ObjectId, ref: "owner", required: true }
    //TODO: Inlcude user and password again
    //pass: [{ type: Schema.Types.ObjectId, ref: "pass" }]
  },
  {
    timestamps: true
  }
);

const Dog = mongoose.model("dog", dogSchema);
module.exports = Dog;
