const passport = require("passport");
const User = require("../../../../models/User.model");
const LocalStrategy = require("passport-local").Strategy;
const { checkHashed } = require("../../hashing");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const foundUser = await User.findOne({ username });
      console.log("FOUND USER", foundUser);
      if (foundUser) {
        if (foundUser.username.indexOf("@dev")) {
          foundUser.password === password ? done(null, foundUser) : done(null, false);
        } else {
          checkHashed(password, foundUser.password) ? done(null, foundUser) : done(null, false);
        }
      } else {
        console.log("NOT FOUND");
        done(null, false, { message: "Invalid username or password." });
      }
    } catch (error) {
      done(error);
    }
  })
);
