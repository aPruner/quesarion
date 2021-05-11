const bcrypt = require('bcrypt');

const hashPassword = (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds);
};

module.exports = {
  hashPassword
};
