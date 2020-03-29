const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog.model");
const { crudGenerator } = require("../routes/crud.model");

router.use(
  "/dog",
  crudGenerator(Dog, {
    createProtectFields: [],
    populateFields: ["name", "breed"],
    extraFieldsCreate: req => {
      if (!req.user) throw new Error("To create a frase you have to login first");
      return {
        creator: req.user._id
      };
    }
  })
);

router.get("/", (req, res, next) => {
  res.json({ status: "Bienvenido/a a la Guaurderia" });
});

module.exports = router;
