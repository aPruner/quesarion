const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  return bcrypt.hash(password);
};

module.exports = {
  hashPassword
};
