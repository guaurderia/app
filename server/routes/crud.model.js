const express = require("express");
const _ = require("lodash");
require("../models/Breed.model");
const { asyncController } = require("../middleware/asyncController");
const { isLoggedIn } = require("../middleware/auth/isLogged");
const User = require("../models/User.model");
const Attendance = require("../models/Attendance.model");
const Pass = require("../models/Pass.model");

const crudGenerator = (
  Model,
  uniqueIndex,
  { createProtectFields, extraFieldsCreate, populateFields } = {
    createProtectFields: [],
    extraFieldsCreate: () => ({}),
    populateFields: [],
  }
) => {
  const router = express.Router();

  const allFields = Object.keys(Model.schema.paths);
  const createFields = _.without(allFields, ...["__v", "createdAt", "updatedAt", ...createProtectFields]);
  const dataCompiler = (req, obj) => ({ ..._.pick(obj, createFields), ...extraFieldsCreate(req) });
  const dataPicker = (pick, obj) => _.pick(obj, pick);

  router.post(
    "/create",
    asyncController(async (req, res) => {
      const data = dataCompiler(req, req.body);
      const unique = dataPicker(uniqueIndex, req.body);
      const exists = await Model.findOne({ unique });

      if (exists) {
        return res.status(409).json(`${uniqueIndex} ${Object.values(unique)} already exists in ${Model.modelName} db`);
      } else {
        try {
          await Model.create(data);
          if (Model === Attendance) {
            const active = await Model.find({ confirmed: false }).populate(populateFields);
            return res.json(active);
          } else {
            const list = await Model.find().populate(populateFields);
            return res.json(list);
          }
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
    return res.json(objs);
  });

  router.get("/show/active", async (req, res) => {
    if (Model === Attendance) {
      const active = await Model.find({ confirmed: false }).populate(populateFields);
      res.json(active);
    }
    if (Model === Pass) {
      const active = await Model.find({ $or: [{ expires: { $gt: new Date() } }, { count: { $gt: 0 } }] }).populate(populateFields);
      res.json(active);
    }
  });
  router.get("/show/?", async (req, res) => {
    const query = req.query;
    let data;
    if (_.has(query, "me")) {
      data = await Model.findById(req.user._id);
      res.json(data);
    } else if (_.has(query, "expires")) {
      data = await Model.find(query).populate(populateFields);
      console.log(query, data);
      res.json(data);
    }
  });

  router.post("/update/active/?", async (req, res) => {
    const query = req.query;
    const data = dataCompiler(req, req.body);
    await Model.findOneAndUpdate(query, data);
    const active = await Model.find({ confirmed: false }).populate(populateFields);
    res.json(active);
  });

  router.post("/update/?", async (req, res) => {
    const query = req.query;
    const data = dataCompiler(req, req.body);
    await Model.findOneAndUpdate(query, data);
    const list = await Model.find().populate(populateFields);
    res.json(list);
  });

  router.get(
    "/delete/:id",
    asyncController(async (req, res) => {
      const { id } = req.params;
      await Model.findByIdAndRemove(id);
      const list = await Model.find();
      return res.json(list);
    })
  );
  return router;
};

module.exports = { crudGenerator };
