const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const humanSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mainPhone: { type: Number, required: true },
    emergencyPhone: { type: Number },
    dogs: { type: Schema.Types.ObjectId, ref: "Dog" }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("Human", humanSchema);
module.exports = User;
