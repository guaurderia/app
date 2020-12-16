const mongoose = require("mongoose");
const { MongoError } = require("mongodb");
require("dotenv").config();

const dbUrl = process.env.DBURL_REMOTE || "mongodb://localhost/test";

const withDbConnection = async (fn, disconnectEnd = true) => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connection Ready on ${dbUrl}`);
    await fn();
  } catch (error) {
    console.log("There was an error connecting to MongoDB", error);
  } finally {
    // Disconnect from database
    if (disconnectEnd) {
      await mongoose.disconnect();
      console.log("disconnected from MongoDB");
    }
  }
};

const dropIfExists = async (Model) => {
  try {
    await Model.collection.drop();
  } catch (e) {
    if (e instanceof MongoError) {
      console.log(
        `Cannot drop collection ${Model.collection.name}, because does not exist in DB`
      );
    } else {
      throw e;
    }
  }
};

module.exports = {
  dropIfExists,
  withDbConnection,
};
