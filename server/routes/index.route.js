const express = require("express");
const router = express.Router();
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
  crudGenerator(User)
);

router.use("/auth", auth);

router.get("/", (req, res, next) => {
  res.json({ status: "Bienvenido/a a la Guaurderia" });
});

module.exports = router;
