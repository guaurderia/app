const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dogSchema = new Schema(
  {
    name: { type: String, required: true },
    breed: { type: Object },
    sex: { type: Object, required: true },
    vaccines: Object,
    fixed: { type: Boolean, required: true },
    heat: { had: { type: Boolean }, date: { type: Date } },
    chip: { type: String, required: true },
    notes: String,
    owners: [String],
    scan: String,
    activeAttendance: Object,
    creator: { type: Schema.Types.ObjectId, ref: "user" },
    username: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

dogSchema.virtual("owner", {
  ref: "user",
  localField: "username",
  foreignField: "username",
  justOne: false,
});

const Dog = mongoose.model("dog", dogSchema);
module.exports = Dog;
