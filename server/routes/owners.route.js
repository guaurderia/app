const express = require("express");
const router = express.Router();
const Owner = require("../models/Owner.model");
const passport = require("passport");
const _ = require("lodash");

router.post("/create", async (req, res) => {
  const { firstName, lastName, username, mainPhone, dni } = req.body;
  const newUser = await Owner.create({
    firstName,
    lastName,
    username,
    mainPhone,
    dni
  });

  req.logIn(newUser, err => {
    res.json(_.pick(req.user, ["firstName", "lastName", "username"]));
  });
});

router.get("/list", async (req, res) => {
  console.log("LIST");

  const list = await Owner.find();
  console.log(list);

  res.json(_.pick(list, ["firstName", "lastName"]));
});

module.exports = router;
