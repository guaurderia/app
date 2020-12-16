const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passSchema = new Schema(
  {
    dogChip: { type: String, required: true },
    passType: { type: Schema.Types.ObjectId, ref: "passType", required: true },
    purchased: { type: Date, required: true },
    starts: Date,
    expires: Date,
    count: Number,
    creator: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

passSchema.virtual("dog", {
  ref: "dog",
  localField: "dogChip",
  foreignField: "chip",
  justOne: true,
});

const Pass = mongoose.model("pass", passSchema);
module.exports = Pass;
