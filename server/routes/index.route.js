const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog.model");
const User = require("../models/User.model");
const Pass = require("../models/Pass.model");
const PassType = require("../models/PassType.model");
const Attendance = require("../models/Attendance.model");
const auth = require("./auth/auth.routes");
const { crudGenerator } = require("../routes/crud.model");
const { isLoggedIn } = require("../middleware/auth/isLogged");

router.use("/user", isLoggedIn("staff"), crudGenerator(User, "username", "firstName"));

router.use(
  "/dog",
  isLoggedIn("staff"),
  crudGenerator(Dog, "chip", "name", {
    createProtectFields: [],
    populateFields: ["owner", "creator"],
    extraFieldsCreate: (req) => ({ creator: req.user._id }),
  })
);

router.use("/passtype", isLoggedIn("admin"), crudGenerator(PassType, "name", "name"));

router.use(
  "/pass",
  isLoggedIn("staff"),
  crudGenerator(Pass, "_id", "_id", {
    createProtectFields: [],
    populateFields: ["dog", "passType", "creator"],
    extraFieldsCreate: (req) => ({ creator: req.user._id }),
  })
);

router.use("/passtype", isLoggedIn("staff"), crudGenerator(PassType, "_id", "_id"));

router.use(
  "/attendance",
  isLoggedIn("staff"),
  crudGenerator(Attendance, "_id", "_id", {
    createProtectFields: [],
    populateFields: ["dog", "creator"],
    extraFieldsCreate: (req) => ({ creator: req.user._id }),
  })
);

router.use("/auth", auth);

router.get("/", (req, res, next) => {
  res.json({ status: "Bienvenido/a a la Guaurderia" });
});

module.exports = router;
