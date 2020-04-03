const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String },
    mainPhone: { type: Number, required: true },
    dni: { type: String, required: true },
    roll: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "user" }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
