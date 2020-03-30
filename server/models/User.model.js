const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String },
<<<<<<< HEAD
    admin: { type: Boolean, required: true }
=======
    roll: { type: String }
>>>>>>> f16ca83a73e500b6d98e7ae70308eedf16060c41
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
