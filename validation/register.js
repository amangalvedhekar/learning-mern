const {
  userConfirmPasswordLens,
  userEmailLens,
  userErrorEmailLens,
  userErrorConfirmPasswordLens,
  userErrorFirstNameLens,
  userErrorLastNameLens,
  userErrorPasswordLens,
  userFirstNameLens,
  userLastNameLens,
  userPasswordLens
} = require('../lens/userRegistration');

const view = require('ramda').view;
const set = require('ramda').set;

const {
  isEqual,
  isNilOrEmpty,
  minMaxLengthValidation,
} = require('../util/validations');

const {
  minNameLength,
  maxNameLength,
  minPasswordLength,
  maxPasswordLength
} = require('../util/constants');

/**
 *
 * @param data
 * @returns object
 */
module.exports = function validateRegisterInput(data) {
  const errors = {
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',

  };

  const firstName = view(userFirstNameLens, data);
  const lastName = view(userLastNameLens, data);
  const email = view(userEmailLens, data);
  const password = view(userPasswordLens, data);
  const confirmPassword = view(userConfirmPasswordLens, data);

  const firstNameValidation = isNilOrEmpty(firstName);
  const lastNameValidation = isNilOrEmpty(lastName);
  const emailValidation = isNilOrEmpty(email);
  const passwordValidation = isNilOrEmpty(password);
  const confirmPasswordValidation = isNilOrEmpty(confirmPassword);

  if (firstNameValidation) {
    const firstNameError = set(userErrorFirstNameLens, 'Please enter first name', errors);
    return Object.assign({ error: firstNameError }, { isValid: false }, {});
  }

  if (lastNameValidation) {
    const lastNameError = set(userErrorLastNameLens, 'Please enter last name', errors);
    return Object.assign({ error: lastNameError }, { isValid: false, }, {});
  }

  if (emailValidation) {
    const emailError = set(userErrorEmailLens, 'Please enter email', errors);
    return Object.assign({ error: emailError }, { isValid: false }, {});
  }

  if (passwordValidation) {
    const passwordError = set(userErrorPasswordLens, 'Please enter password', errors);
    return Object.assign({ error: passwordError }, { isValid: false }, {});
  }

  if (confirmPasswordValidation) {
    const confirmPasswordError = set(userErrorConfirmPasswordLens, 'Please enter password again', errors);
    return Object.assign({ error: confirmPasswordError }, { isValid: false }, {});
  }

  if (!minMaxLengthValidation(minNameLength, maxNameLength, firstName)) {
    const firstNameLengthError = set(
      userErrorFirstNameLens,
      `First name should be between ${minNameLength} and ${maxNameLength} characters`,
      errors
    );
    return Object.assign({error: firstNameLengthError}, {isValid: false}, {});
  }

  if (!minMaxLengthValidation(minNameLength, maxNameLength, lastName)) {
    const lastNameLengthError = set(
      userErrorFirstNameLens,
      `Last name should be between ${minNameLength} and ${maxNameLength} characters`,
      errors
    );
    return Object.assign({error: lastNameLengthError}, {isValid: false}, {});
  }

  if (!minMaxLengthValidation(minPasswordLength, maxPasswordLength, password)) {
    const passwordLengthError = set(
      userErrorFirstNameLens,
      `Password should be between ${minPasswordLength} and ${maxPasswordLength} characters`,
      errors
    );
    return Object.assign({error: passwordLengthError}, {isValid: false}, {});
  }

  if (!minMaxLengthValidation(minPasswordLength, maxPasswordLength, confirmPassword)) {
    const confirmPasswordLengthError = set(
      userErrorFirstNameLens,
      `Password should be between ${minPasswordLength} and ${maxPasswordLength} characters`,
      errors
    );
    return Object.assign({error: confirmPasswordLengthError}, {isValid: false}, {});
  }

  if(!isEqual(password, confirmPassword)){
    const passwordMatchError = set(
      userErrorPasswordLens,
      'Passwords don\'t match',
      errors
    );

    return Object.assign({error: passwordMatchError}, {isValid: false}, {});
  }
  return {
    errors,
    isValid: true,
  };
};
