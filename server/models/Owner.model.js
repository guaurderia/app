const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String },
    mainPhone: { type: Number, required: true },
    dni: { type: String, required: true },
    dogs: { type: Schema.Types.ObjectId, ref: "dog" },
    creator: { type: Schema.Types.ObjectId, ref: "user" }
  },
  {
    timestamps: true
  }
);

const Owner = mongoose.model("owner", ownerSchema);
module.exports = Owner;
