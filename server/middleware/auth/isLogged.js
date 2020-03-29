const isLoggedIn = (redirectRoute = "/") => (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    //req.flash("You must be logged in to access this view");
    return res.redirect(redirectRoute);
  }
};

const isLoggedOut = (redirectRoute = "/") => (req, res, next) => (!req.user ? next() : res.redirect(redirectRoute));

module.exports = {
  isLoggedIn,
  isLoggedOut
};
