const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const view = require('ramda').view;
const partialRight = require('ramda').partialRight;
const partial = require('ramda').partial;
const pick = require('ramda').pick;

const router = express.Router();

const secretKeys = require('../../config/key').secretOrKey;

const {
  userEmailLens,
  userPasswordLens,
} = require('../../lens/userRegistration');

const {
  getHash,
  getSalt
} = require('../../util/bcrypt');

const {
  findUser,
  saveUser,
} = require('../../util/user');

const {
  sendResponseObject,
} = require('../../util');


const registerUser = (user, req, res) => {

  const password = view(userPasswordLens, req);

  if (user) {
    return sendResponseObject(
      res,
      400,
      { email: 'Email already exists' },
      req.body
    );
  }

  getSalt()
    .then(partial(getHash, [password]))
    .then(partialRight(saveUser, [req]))
    .then(user => res.json(user))
    .catch(err => console.log(err, 'inside err'));
};

//ToDo: use logger
const userRegistration = (req, res) => {
  findUser('email', userEmailLens, req)
    .then(partialRight(registerUser, [req, res]))
    .catch(e => console.log(e, 'error in registering user'));
};

const userLogin = (req, res) => {
  const password = req.body.password;

  findUser('email', userEmailLens, req)
    .then(user => {

      if (!user) {
        return res
          .status(404)
          .send({ email: 'User not found' });
      }

      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {

            const payload = {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              avatar: user.avatar,
            };

            jwt.sign(payload, secretKeys, { expiresIn: 3600 }, (err, token) => {
              res.json({ success: true, token: `Bearer ${token}` });
            });
          } else {
            return res
              .status(400)
              .json({ password: 'Password incorrect' });
          }
        });
    });
};

/**
 * @route {POST} api/users/register
 * @authentication Public
 */
router.post('/register', userRegistration);

router.post('/login', userLogin);

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  });
});

module.exports = router;
