const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const _ = require("lodash");
const passport = require("passport");
const { isLoggedIn, isLoggedOut } = require("../../middleware/auth/isLogged");
const { hashPassword } = require("../../middleware/auth/hashing");
const signupFormValidation = require("../../middleware/auth/signupFormValidation");

router.post("/signup", isLoggedIn("admin"), signupFormValidation(), async (req, res) => {
  const { username, password, ...rest } = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(409).json("User already exists");
  } else {
    try {
      const newUser = await User.create({ username, password: hashPassword(password), ...rest });
      return res.json(`${req.user.firstName}, you've created the new user ${newUser.firstName}`);
    } catch (err) {
      if (err.name == "ValidationError") {
        const keys = Object.keys(err.errors);
        return res.status(422).json(keys.map(key => err.errors[key].message));
      } else {
        console.error(err);
        return res.status(500).json(err);
      }
    }
  }
});

router.post("/login", isLoggedOut(), passport.authenticate("local"), async (req, res) => {
  console.log("LOGIN USER", req.user);
  res.json({ status: `Welcome back ${req.user.firstName}` });
});

router.post("/logout", isLoggedIn(), async (req, res) => {
  const name = req.user.firstName;
  req.logOut();
  res.json(`Goodbye, ${name}`);
});

module.exports = router;
