const bcrypt = require('bcryptjs');

const getSalt = (rounds =10) => bcrypt.genSalt(rounds);

const getHash = (string, salt) => bcrypt.hash(string, salt);

module.exports = {
  getHash,
  getSalt,
};
