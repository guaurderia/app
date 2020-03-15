const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String },
    mainPhone: { type: Number, required: true },
    emergencyPhone: { type: Number },
    adress: { type: Object },
    dogs: { type: Schema.Types.ObjectId, ref: "Dog" }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
