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
    const objs = await Model.find().populate(populateFields);
    return res.json(objs);
  });

  // Create
  router.post(
    "/create",
    asyncController(async (req, res, next) => {
      // NOTE: For security reasons, only allow input certain fields
      const data = {
        ..._.pick(req.body, createFields),
        ...extraFieldsCreate(req)
      };
      const obj = await Model.create(data);
      return res.json(obj);
    })
  );

  // Delete
  router.get(
    "/delete/:id",
    asyncController(async (req, res, next) => {
      const { id } = req.params;
      await Model.findByIdAndRemove(id);
      return res.json({ status: "Deleted", id });
    })
  );
  return router;
};

module.exports = { crudGenerator };
