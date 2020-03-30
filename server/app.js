require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
<<<<<<< HEAD
const dbUrl = process.env.DBURL ? process.env.DBURL : "mongodb://localhost/test";

require("./config/db.config");
=======
const dbUrl = process.env.DBURL ? process.env.DBURL : 'mongodb://localhost/test';

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
>>>>>>> f16ca83a73e500b6d98e7ae70308eedf16060c41

const app = express();

// Middleware Setup
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
<<<<<<< HEAD
require("./middleware/auth/passport/index")(app);
=======
require("./auth")(app);
>>>>>>> f16ca83a73e500b6d98e7ae70308eedf16060c41
app.use(express.static(path.join(__dirname, "public")));

const index = require("./routes/index.route");
app.use("/", index);

module.exports = app;
