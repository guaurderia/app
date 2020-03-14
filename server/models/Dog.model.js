const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dogSchema = new Schema(
  {
    name: { type: String, required: true },
    bread: { type: String, required: true },
    age: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    humans: { type: Schema.Types.ObjectId, ref: "Human" }
  },
  {
    timestamps: true
  }
);

const Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;
