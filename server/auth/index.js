const passport = require("passport");
const User = require("../models/User.model");
const LocalStrategy = require("passport-local").Strategy;
const { checkHashed } = require("./hashing");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(username, password);
    try {
      const foundUser = await User.findOne({ username });
      if (foundUser) {
        checkHashed(password, foundUser.password) ? done(null, foundUser) : done(null, false);
      } else {
        done(null, false);
      }
    } catch (error) {
      console.log(error);
      done(error);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  console.log("deserializing user");
  User.findById(id)
    .then(user => cb(null, user))
    .catch(e => cb(err));

  User.findById(id, (err, user) => {
    if (err) {
      return c;
    }
    cb(null, user);
  });
});

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
};
