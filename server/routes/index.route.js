const express = require("express");
const router = express.Router();
const register = require("./register.route");

router.use("/register", register);

router.get("/", (req, res) => {
  res.json({ status: "Bienvenido/a a la Guaurderia" });
});

module.exports = router;
