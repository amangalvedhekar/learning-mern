const express = require('express');
const gravator = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const view = require('ramda').view;
const partialRight = require('ramda').partialRight;

const router = express.Router();

const User = require('../../models/User');
const secretKeys = require('../../config/key').secretOrKey;

const {
  userEmailLens,
  userFirstNameLens,
  userLastNameLens,
  userPasswordLens,
} = require('../../lens/userRegistration');

const registerUser = (user, req, res) => {

  const userEmail = view(userEmailLens, req);
  const firstName = view(userFirstNameLens, req);
  const lastName = view(userLastNameLens, req);
  const email = view(userEmailLens, req);
  const password = view(userPasswordLens, req);

  if (user) {
    return res
      .status(400)
      .json({ email: 'Email already exists' });
  }
  const gravatorSettings = {
    s: '200',
    r: 'pg',
    d: 'mm',
  };

  const avatar = gravator.url(
    userEmail,
    gravatorSettings
  );

  const hashPassword = (err, password) => {
    if (err) {
      console.log(err, 'error hashing');
      throw err;
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      avatar,
      password,
    });

    newUser
      .save()
      .then(user => res.json(user))
      .catch(e => console.log(e));
  };

  const generateSalt = (err, salt) => {
    bcrypt.hash(password, salt, hashPassword);
  };

  //ToDo: use promises instead of callbacks
  bcrypt.genSalt(10, generateSalt);

  // console.log(bcrypt.genSalt(10).then(salt => partial(bcrypt.hash(salt, [password]))));
};

//ToDo: use logger
const userRegistration = (req, res) => {
  const email = {
    email: view(userEmailLens, req),
  };
  User
    .findOne(email)
    .then(partialRight(registerUser, [req, res]))
    .catch(e => console.log(e, 'error saving in registring user'));
};

const userLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User
    .findOne({ email })
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
