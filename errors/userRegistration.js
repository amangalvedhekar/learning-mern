const {
  maxNameLength,
  maxPasswordLength,
  minNameLength,
  minPasswordLength,
} = require('../util/constants');

module.exports = {
  required: {
    userEmail: 'Email is required',
    password: 'Password is required',
    confirmPassword: 'Please confirm password',
    firstName: 'first name is required',
    lastName: 'last name is required',
  },
  validation: {
    emailExists: 'Email already exists',
    firstNameLimit: `first name should be between ${minNameLength} and ${maxNameLength}`,
    lastNameLimit: `last name should be between ${minNameLength} and ${maxNameLength}`,
    passwordLimit: `last name should be between ${minPasswordLength} and ${maxPasswordLength}`
  },
};
