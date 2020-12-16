const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog.model");
const User = require("../models/User.model");
const Pass = require("../models/Pass.model");
const PassType = require("../models/PassType.model");
const Attendance = require("../models/Attendance.model");
const auth = require("./auth/auth.routes");
const { crudGenerator } = require("../routes/crud.model");
const { isRequired } = require("../middleware/auth/isLogged");

router.use(
  "/user",
  isRequired("staff"),
  crudGenerator({
    Model: User,
    uniqueIndex: "username",
    populateFields: ["dog"],
    extraFieldsCreate: (req) => ({}),
  })
);

router.use(
  "/dog",
  isRequired("staff"),
  crudGenerator({
    Model: Dog,
    uniqueIndex: "chip",
    populateFields: ["owner", "creator"],
    extraFieldsCreate: (req) => ({ creator: req.user._id }),
  })
);

router.use("/passtype", isRequired("staff"));

router.use(
  "/pass",
  isRequired("staff"),
  crudGenerator({
    Model: Pass,
    uniqueIndex: "_id",
    populateFields: ["dog", "passType", "creator"],
    extraFieldsCreate: (req) => ({ creator: req.user._id }),
  })
);

router.use("/passtype", isRequired("staff"));

router.use(
  "/attendance",
  isRequired("staff"),
  crudGenerator({
    Model: Attendance,
    uniqueIndex: "dog",
    populateFields: ["dog", "creator"],
    extraFieldsCreate: (req) => ({ creator: req.user._id }),
  })
);

router.use("/auth", auth);

router.get("/", (req, res, next) => {
  res.json({ status: "Bienvenido/a a la Guaurderia" });
});

module.exports = router;
