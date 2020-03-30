const mongoose = require("mongoose");
const { MongoError } = require("mongodb");
require("dotenv").config();

<<<<<<< HEAD
const dbUrl = process.env.DBURL ? process.env.DBURL : "mongodb://localhost/test";
=======
const dbUrl = process.env.DBURL ? process.env.DBURL : 'mongodb://localhost/test';
>>>>>>> f16ca83a73e500b6d98e7ae70308eedf16060c41

const withDbConnection = async (fn, disconnectEnd = true) => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`Connection Ready on ${dbUrl}`);
    await fn();
  } catch (error) {
    console.log("ERROR");
    console.log(error);
  } finally {
    // Disconnect from database
    if (disconnectEnd) {
      await mongoose.disconnect();
      console.log("disconnected");
    }
  }
};

const dropIfExists = async Model => {
  try {
    await Model.collection.drop();
  } catch (e) {
    if (e instanceof MongoError) {
      console.log(`Cannot drop collection ${Model.collection.name}, because does not exist in DB`);
    } else {
      throw e;
    }
  }
};

module.exports = {
  dropIfExists,
  withDbConnection
};
