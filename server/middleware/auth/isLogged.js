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

const isLoggedOut = () => (req, res, next) => {
  if (!req.user) return next();
  else {
    const userRoll = req.user.roll;
    if (userRoll === "admin" || userRoll === "user") return next();
    else return res.status(400).json(`${req.user.firstName}, you are already logged in`);
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut
};
