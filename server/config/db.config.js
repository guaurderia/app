require("dotenv").config();
const dbUrl = process.env.DBURL_REMOTE || "mongodb://localhost:27017";
const mongoose = require("mongoose");

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

module.exports = mongoose;
