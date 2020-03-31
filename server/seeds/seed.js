const { withDbConnection, dropIfExists } = require("../config/withDbConnection");

const createSeeds = async (Model, data) => {
  try {
    await withDbConnection(async () => {
      if ((await Model.find()).length > 0) await dropIfExists(Model);
      for (let list of data) {
        await Model.create(list);
      }
      const created = await Model.find();
      console.log(`${created.length} ${Model.modelName} created`);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = createSeeds;
