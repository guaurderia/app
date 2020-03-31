const isLoggedIn = roll => (req, res, next) => {
  if (!req.user) return res.status(401).json("You need to login to access this page");
  else {
    const userRoll = req.user.roll;
    if (roll === "admin") {
      if (userRoll === "admin") return next();
      else return res.status(401).json("You need to be an adminitrator to access this page");
    }
    if (roll === "user") {
      if (userRoll === "admin" || userRoll === "user") return next();
      else return res.status(401).json("You need to be an adminitrator or staff to access this page");
    } else return next();
  }
};

const isLoggedOut = routeName => (req, res, next) => {
  if (!req.user) return next();
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
