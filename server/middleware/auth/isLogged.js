const hierarchyOf = {
  admin: 1,
  staff: 2,
  user: 3,
};

const isRequired = (requiredRoll) => (req, res, next) => {
  if (!req.user)
    return res.status(401).json("You need to login to access this page");

  if (hierarchyOf[req.user.roll] > hierarchyOf[requiredRoll]) {
    return res.status(401).json("You are not authorized to access this data");
  }

  return next();
};

const isLoggedOut = () => (req, res, next) => {
  if (!req.user) return next();
  else {
    return res
      .status(400)
      .json(
        `You are already logged in as ${req.user.firstName}. If you'd like to login to a different profile, logout of the current profile first.`
      );
  }
};

module.exports = {
  isRequired,
  isLoggedOut,
};
