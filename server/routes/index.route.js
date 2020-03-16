const express = require("express");
const router = express.Router();
const owners = require("./owners.route");

router.use("/owners", owners);

router.get("/", (req, res) => {
  res.json({ status: "Bienvenido/a a la Guaurderia" });
});

module.exports = router;
