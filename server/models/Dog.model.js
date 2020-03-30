const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dogSchema = new Schema(
  {
    name: { type: String, required: true },
<<<<<<< HEAD
    breed: { type: String, required: true },
=======
    bread: { type: String, required: true },
>>>>>>> f16ca83a73e500b6d98e7ae70308eedf16060c41
    sex: { type: String, required: true },
    vaccines: { rabies: { type: Boolean }, parvovirus: { type: Boolean }, hepatitis: { type: Boolean }, distemper: { type: Boolean } },
    fixed: { type: Boolean, required: true },
    heat: { had: { type: Boolean }, date: { type: Date } },
    chip: { type: String },
<<<<<<< HEAD
    character: { type: String },
    scan: { type: Number }
=======
    character: { type: String }
>>>>>>> f16ca83a73e500b6d98e7ae70308eedf16060c41
    //TODO: Inlcude user and password again
    //user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    //pass: [{ type: Schema.Types.ObjectId, ref: "pass" }]
  },
  {
    timestamps: true
  }
);

const Dog = mongoose.model("dog", dogSchema);
module.exports = Dog;
