const express = require("express");
const _ = require("lodash");
require("../models/Breed.model");
const { asyncController } = require("../middleware/asyncController");
const { isLoggedIn } = require("../middleware/auth/isLogged");
const User = require("../models/User.model");
const Attendance = require("../models/Attendance.model");

const crudGenerator = (
  { Model, uniqueIndex, extraFieldsCreate, populateFields } = {
    extraFieldsCreate: () => ({}),
    populateFields: [],
    ...rest,
  }
) => {
  const router = express.Router();
  const filterData = (req) => {
    const fieldsToCreate = Object.keys(Model.schema.paths).filter(
      (path) => !["__v", "createdAt", "updatedAt"].includes(path)
    );
    return _.pick(req.body, fieldsToCreate);
  }

  router.post(
    "/create",
    asyncController(async (req, res) => {
      const data = filterData(req)
      const exists = await Model.findOne({ uniqueIndex });

      if (exists) {
        return res
          .status(409)
          .json(
            `${uniqueIndex} ${unique} already exists in ${Model.modelName} db`
          );
      } else {
        try {
          const created = await Model.create(data);
          return res.json(created);
        } catch (err) {
          if (err.name == "ValidationError") {
            const keys = Object.keys(err.errors);
            return res
              .status(422)
              .json(keys.map((key) => err.errors[key].message));
          } else {
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

  router.get("/show/?", async (req, res) => {
    const query = req.query;
    let data;
    if (_.has(query, "me")) {
      data = await Model.findById(req.user._id);
      res.json(data);
    } else {
      data = await Model.find(query).populate(populateFields);
      res.json(data);
    }
  });

  router.post("/update/?", async (req, res) => {
    const query = req.query;
    const data = filterData(req)
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
