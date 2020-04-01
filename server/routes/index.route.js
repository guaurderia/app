const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog.model");
const User = require("../models/User.model");
const Pass = require("../models/Pass.model");
const PassType = require("../models/PassType.model");
const Attendance = require("../models/Attendance.model");
const auth = require("./auth/auth.router");
const { crudGenerator } = require("../routes/crud.model");
const { isLoggedIn } = require("../middleware/auth/isLogged");

router.use("/user", isLoggedIn("user"), crudGenerator(User, "username", "firstName"));

router.use(
  "/dog",
  isLoggedIn(),
  crudGenerator(Dog, "chip", "name", {
    createProtectFields: [],
    populateFields: [],
    extraFieldsCreate: req => ({ creator: req.user._id })
  })
);

router.use("/passtype", isLoggedIn("admin"), crudGenerator(PassType, "name", "name"));

router.use(
  "/pass",
  isLoggedIn("user"),
  crudGenerator(Pass, "_id", "_id", {
    createProtectFields: [],
    populateFields: ["dog", "passType", "creator"],
    extraFieldsCreate: req => ({ creator: req.user._id })
  })
);

router.use(
  "/attendance",
  isLoggedIn("user"),
  crudGenerator(Attendance, "_id", "_id", {
    createProtectFields: [],
    populateFields: ["dog", "creator"],
    extraFieldsCreate: req => ({ creator: req.user._id })
  })
);

router.use("/auth", auth);

router.get("/", (req, res, next) => {
  res.json({ status: "Bienvenido/a a la Guaurderia" });
});

module.exports = router;
