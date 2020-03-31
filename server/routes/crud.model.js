const express = require("express");
const _ = require("lodash");
const { asyncController } = require("../middleware/asyncController");

const crudGenerator = (
  Model,
  { createProtectFields, extraFieldsCreate, populateFields } = {
    createProtectFields: [],
    extraFieldsCreate: () => ({}),
    populateFields: []
  }
) => {
  const router = express.Router();

  const allFields = Object.keys(Model.schema.paths);
  const createFields = _.without(allFields, ...["_id", "__v", "createdAt", "updatedAt", ...createProtectFields]);
  const dataPicker = (req, obj) => ({ ..._.pick(obj, createFields), ...extraFieldsCreate(req) });

  router.post(
    "/create",
    asyncController(async (req, res) => {
      // NOTE: For security reasons, only allow input certain fields
      const data = dataPicker(req, req.body);
      const { username } = req.body;
      const exists = await Model.find({ username });

      if (exists) {
        return res.status(409).json("User already exists");
      } else {
        try {
          const obj = await Model.create(data);
          return res.json(obj);
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
    })
  );

  router.get("/show/all", async (req, res, next) => {
    const objs = await Model.find().populate(populateFields);
    return res.json(objs);
  });

  router.get("/show/:id", async (req, res) => {
    const { id } = req.params;
    const obj = await Model.findById(id);
    const data = dataPicker(req, obj);
    res.json(data);
  });

  router.post("/update/:id", async (req, res) => {
    const { id } = req.params;
    const data = dataPicker(req, req.body);
    await Model.findByIdAndUpdate(id, data);
    const updatedObj = await Model.findById(id);
    res.json(updatedObj);
  });

  router.get(
    "/delete/:id",
    asyncController(async (req, res, next) => {
      const { id } = req.params;
      const obj = await Model.findByIdAndRemove(id);
      return res.json(`${obj.name} has been deleted`);
    })
  );
  return router;
};

module.exports = { crudGenerator };
