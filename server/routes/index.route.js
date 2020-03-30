const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const Dog = require("../models/Dog.model");
const User = require("../models/User.model");
const auth = require("./auth/auth.router");
const { crudGenerator } = require("../routes/crud.model");
const { isLoggedIn } = require("../middleware/auth/isLogged");

router.use(
  "/dog",
  isLoggedIn(),
  crudGenerator(Dog, {
    createProtectFields: [],
    populateFields: [],
    extraFieldsCreate: req => {
      if (!req.user) throw new Error("To add a dog you have to login first");
      return {
        creator: req.user._id
      };
    }
  })
);

router.use(
  "/user",
  isLoggedIn("admin"),
  crudGenerator(User, {
    createProtectFields: [],
    populateFields: [],
    extraFieldsCreate: req => {
      if (!req.user) throw new Error("To add a user you have to be an administrator");
      return {
        creator: req.user._id
      };
    }
  })
);

router.use("/auth", auth);
=======
const owners = require("./owners.route");
const dog = require("./dog");

router.use("/owners", owners);
router.use("/dog", dog);
>>>>>>> f16ca83a73e500b6d98e7ae70308eedf16060c41

router.get("/", (req, res, next) => {
  res.json({ status: "Bienvenido/a a la Guaurderia" });
});

module.exports = router;
