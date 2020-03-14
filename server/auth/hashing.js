const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = text => bcrypt.hashSync(text, salt);
const checkHashed = bcrypt.compareSync;

module.exports = {
  hashPassword,
  checkHashed
};
