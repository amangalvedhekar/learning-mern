const isNil = require('ramda').isNil;
const isEmpty = require('ramda').isEmpty;
const either = require('ramda').either;
const length = require('ramda').length;
const equals = require('ramda').equals;

const isNilOrEmpty = either(isNil, isEmpty);

const minMaxLengthValidation = (minLength, maxLength) => data =>
  length(data) >= minLength && length(data) <= maxLength;

const isEqual = (elementOne, elementTwo) => equals(elementOne, elementTwo);
module.exports = {
  isEqual,
  isNilOrEmpty,
  minMaxLengthValidation,
};
