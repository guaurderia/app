const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String },
    mainPhone: { type: String, required: true },
    dni: { type: String, required: true },
    roll: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "user" },
    dogChip: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("dog", {
  ref: "dog",
  localField: "dogChip",
  foreignField: "chip",
  justOne: false,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
