const lensPath = require('ramda').lensPath;
const lensProp = require('ramda').lensProp;

const userFirstNameLens = lensPath(['body', 'firstName']);
const userLastNameLens = lensPath(['body', 'lastName']);
const userEmailLens = lensPath(['body', 'email']);
const userPasswordLens = lensPath(['body', 'password']);
const userConfirmPasswordLens = lensPath(['body', 'confirmPassword']);
const userErrorFirstNameLens = lensProp('firstName');
const userErrorLastNameLens = lensProp('lastName');
const userErrorPasswordLens = lensProp('password');
const userErrorConfirmPasswordLens = lensProp('confirmPassword');
const userErrorEmailLens = lensProp('email');

module.exports = {
  userConfirmPasswordLens,
  userEmailLens,
  userErrorConfirmPasswordLens,
  userErrorFirstNameLens,
  userErrorLastNameLens,
  userErrorPasswordLens,
  userErrorEmailLens,
  userFirstNameLens,
  userLastNameLens,
  userPasswordLens,
};
