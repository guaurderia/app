const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: [true, "Tienes que introducir tu nombre"] },
    lastName: { type: String, required: [true, "Tienes que introducir tus apellidos"] },
    username: { type: String, required: [true, "Introduce una dirección de correo electrónico correcta"] },
    password: { type: String },
    admin: { type: Boolean, required: [true, "You must specify if you this user is an adminitrator"] }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
