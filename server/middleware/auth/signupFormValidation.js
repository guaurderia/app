const signupFormValidation = () => (req, res, next) => {
  const emailRegEx = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  const { username, password } = req.body;

  if (!username || !password) return res.json({ status: "Please fill out all required fields" });

  const validUsername = emailRegEx.test(username);

  if (!validUsername) res.json(`Please enter a valid email address.`);
  else return next();
};

module.exports = signupFormValidation;
