const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const passport = require("passport");
const _ = require("lodash");

router.post("/user", async (req, res) => {
  const { firstName, lastName, username, mainPhone, emergencyPhone } = req.body;
  const newUser = await User.create({
    firstName,
    lastName,
    username,
    mainPhone,
    emergencyPhone
  });

  req.logIn(newUser, err => {
    res.json(_.pick(req.user, ["firstName", "lastName", "username"]));
  });
});

module.exports = router;
