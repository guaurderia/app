const isLoggedIn = roll => (req, res, next) => {
  if (roll === "admin") {
    if (req.user.admin) return next();
    else return res.json("You need to be an adminitrator to access this page");
  }
  if (req.user) {
    next();
  } else {
    //req.flash("You must be logged in to access this view");
    return res.json("You need to login to access this page");
  }
};

const isLoggedOut = routeName => (req, res, next) => {
  if (!req.user) next();
  else {
    switch (routeName) {
      case "signup":
        if (req.user.admin) return next();
        else return res.json(`${req.user.firstName}, you need to loggout if you want to register another user`);
      case "login":
        return res.json(`You are already logged in as ${req.user.firstName}`);
      default:
        return res.json(`You are already logged in as ${req.user.firstName}`);
    }
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut
};
