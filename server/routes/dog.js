const express = require("express");
const DogModel = require("../models/Dog.model");
const _ = require("lodash");
const router = express.Router();

// REGISTER NEW DOG
router.post("/create", async (req, res, next) => {
  const { name, bread, sex, vaccines, fixed, heat, chip, character, user, pass } = req.body;
  // Create dog
  const newDog = await DogModel.create({ name, bread, sex, vaccines, fixed, heat, chip, character, user, pass });
});

// GET DOGS
router.get("/list", async (req, res, next) => {
  await DogModel.get(dog);
  return res.json({ status: "LISTA", id });
});


// GET DOGS
router.get("/info/:id", async (req, res, next) => {
    const { id } = req.params;
    await DogModel.findOne(id);
    return res.json({ status: "LISTA", id });
});
    

// DELETE DOG
router.get("/delete/:id", async (req, res, next) => {
    const { id } = req.params;
    await DogModel.findByIdAndRemove(id);
    return res.json({ status: "Deleted", id });
});

module.exports = router;