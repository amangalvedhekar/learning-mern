const gravator = require('gravatar');
const view = require('ramda').view;

const User = require('../models/User');
const gravatorSettings = require('./constants');
const {
  userEmailLens,
  userFirstNameLens,
  userLastNameLens,
} = require('../lens/userRegistration');


const saveUser = (password, req) => {

  const firstName = view(userFirstNameLens, req);
  const lastName = view(userLastNameLens, req);
  const email = view(userEmailLens, req);

  const avatar = gravator.url(
    email,
    gravatorSettings
  );

  const newUser = new User({
    firstName,
    lastName,
    email,
    avatar,
    password,
  });

  return newUser.save();
};

const findUser = (findParam, paramLens, req) => {
  let param ={};
  param[findParam] = view(paramLens, req);
  return User.findOne(param);
};

module.exports = {
  findUser,
  saveUser,
};
