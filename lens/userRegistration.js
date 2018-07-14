const lensPath = require('ramda').lensPath;

const userFirstNameLens = lensPath(['body', 'firstName']);
const userLastNameLens = lensPath(['body', 'lastName']);
const userEmailLens = lensPath(['body','email']);
const userPasswordLens = lensPath(['body', 'password']);

module.exports = {
  userEmailLens,
  userFirstNameLens,
  userLastNameLens,
  userPasswordLens,
};
