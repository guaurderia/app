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
<<<<<<< HEAD
  const createFields = _.without(allFields, ...["_id", "__v", "createdAt", "updatedAt", ...createProtectFields]);
  const dataPicker = (req, obj) => ({ ..._.pick(obj, createFields), ...extraFieldsCreate(req) });

  // Retrieve
  router.get("/list", async (req, res, next) => {
=======
  const createFields = _.without(
    allFields,
    ...["_id", "__v", "createdAt", "updatedAt", ...createProtectFields]
  );

  // Fields
  router.get(
    "/fields",
    asyncController(async (req, res, next) => {
      return res.json({ createFields });
    })
  );

  // Retrieve
  router.get("/", async (req, res, next) => {
>>>>>>> f16ca83a73e500b6d98e7ae70308eedf16060c41
    const objs = await Model.find().populate(populateFields);
    return res.json(objs);
  });

<<<<<<< HEAD
=======
  // Create
>>>>>>> f16ca83a73e500b6d98e7ae70308eedf16060c41
  router.post(
    "/create",
    asyncController(async (req, res, next) => {
      // NOTE: For security reasons, only allow input certain fields
<<<<<<< HEAD
      const data = dataPicker(req, req.body);
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
    })
  );

  router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const obj = await Model.findById(id);
    const data = dataPicker(req, obj);
    res.json(data);
  });

  router.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const data = dataPicker(req, req.body);
    await Model.findByIdAndUpdate(id, data);
    const updatedObj = await Model.findById(id);
    res.json(updatedObj);
  });

=======
      const data = {
        ..._.pick(req.body, createFields),
        ...extraFieldsCreate(req)
      };
      const obj = await Model.create(data);
      return res.json(obj);
    })
  );

  // Delete
>>>>>>> f16ca83a73e500b6d98e7ae70308eedf16060c41
  router.get(
    "/delete/:id",
    asyncController(async (req, res, next) => {
      const { id } = req.params;
<<<<<<< HEAD
      const obj = await Model.findByIdAndRemove(id);
      return res.json(`${obj.name} has been deleted`);
=======
      await Model.findByIdAndRemove(id);
      return res.json({ status: "Deleted", id });
>>>>>>> f16ca83a73e500b6d98e7ae70308eedf16060c41
    })
  );
  return router;
};

module.exports = { crudGenerator };
