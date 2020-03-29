const express = require("express");
const router = express.Router();
const owners = require("./owners.route");
const dog = require("./dog");

router.use("/owners", owners);
router.use("/dog", dog);

router.get("/", (req, res, next) => {
  res.json({ status: "Bienvenido/a a la Guaurderia" });
});

module.exports = router;
