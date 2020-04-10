const express = require("express");
const _ = require("lodash");
require("../models/Breed.model");
const { asyncController } = require("../middleware/asyncController");
const { isLoggedIn } = require("../middleware/auth/isLogged");

const crudGenerator = (
  Model,
  uniqueIndex,
  displayName,
  { createProtectFields, extraFieldsCreate, populateFields } = {
    createProtectFields: [],
    extraFieldsCreate: () => ({}),
    populateFields: [],
  }
) => {
  const router = express.Router();

  const allFields = Object.keys(Model.schema.paths);
  const createFields = _.without(allFields, ...["_id", "__v", "createdAt", "updatedAt", ...createProtectFields]);
  const dataCompiler = (req, obj) => ({ ..._.pick(obj, createFields), ...extraFieldsCreate(req) });
  const dataPicker = (pick, obj) => _.pick(obj, pick);

  router.post(
    "/create",
    isLoggedIn("user"),
    asyncController(async (req, res) => {
      // NOTE: For security reasons, only allow input certain fields
      const data = dataCompiler(req, req.body);
      const unique = dataPicker(uniqueIndex, req.body);
      const exists = await Model.findOne({ unique });

      if (exists) {
        return res.status(409).json(`${uniqueIndex} ${Object.values(unique)} already exists in ${Model.modelName} db`);
      } else {
        try {
          await Model.create(data);
          const list = await Model.find();
          return res.json(list);
        } catch (err) {
          if (err.name == "ValidationError") {
            const keys = Object.keys(err.errors);
            return res.status(422).json(keys.map((key) => err.errors[key].message));
          } else {
            console.error(err);
            return res.status(500).json(err);
          }
        }
      }
    })
  );

  router.get("/show/all", async (req, res) => {
    const objs = await Model.find().populate(populateFields);
    console.log(objs);
    return res.json(objs);
  });

  router.get("/show/:id", async (req, res) => {
    console.log("SHOW PROFILE");
    let id;
    if (Model.modelName === "user") {
      id = req.user._id;
    } else {
      id = req.params.id;
    }
    const obj = await Model.findById(id);
    if (obj) {
      const data = dataCompiler(req, obj);
      res.json(data);
    } else {
      res.status(422).json(`This ${Model.modelName} doesn't exist`);
    }
  });

  router.post("/update/:id", isLoggedIn("user"), async (req, res) => {
    const { id } = req.params;
    const data = dataCompiler(req, req.body);
    await Model.findByIdAndUpdate(id, data);
    const updatedObj = await Model.findById(id);
    res.json(updatedObj);
  });

  router.get(
    "/delete/:id",
    isLoggedIn("user"),
    asyncController(async (req, res, next) => {
      const { id } = req.params;
      const obj = await Model.findByIdAndRemove(id);
      const name = Object.values(dataPicker(displayName, obj));
      console.log(name);
      return res.json(`${name} has been deleted from ${Model.modelName} db`);
    })
  );
  return router;
};

module.exports = { crudGenerator };
