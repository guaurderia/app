require("dotenv").config();
const dbUrl = process.env.DBURL ? process.env.DBURL : 'mongodb://localhost/test';
const mongoose = require("mongoose");

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

module.exports = mongoose;
