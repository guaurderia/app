const isLoggedIn = (roll) => (req, res, next) => {
  if (!req.user) return res.status(401).json("You need to login to access this page");
  else {
    const userRoll = req.user.roll;
    if (roll === "admin") {
      if (userRoll === "admin") return next();
      else return res.status(401).json("You need to be an adminitrator to access this page");
    } else if (roll === "staff") {
      if (userRoll === "admin" || userRoll === "staff") return next();
      else return res.status(401).json("You need to be an adminitrator or staff to access this page");
    } else if (roll === undefined) return next();
  }
};

const isLoggedOut = () => (req, res, next) => {
  console.log(req.user);
  if (!req.user) return next();
  else {
    return res.status(400).json(`${req.user.firstName}, you are already logged in`);
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
