const express = require('express');
const gravator = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

const User = require('../../models/User');
const secretKeys = require('../../config/key').secretOrKey;

//ToDo: use ramda, logger
const userRegistration = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then(user => {
    if (user) {
      return res.status(400).json({email: 'Email already exists'});
    } else {
      const avatar = gravator.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });


      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if(err) {
            console.log(err, 'error hashing');
            throw err;
          }
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: hash,
          });
            newUser
              .save()
              .then(user => res.json(user))
              .catch(e => console.log(e));
        });
      });
    }
  });
};

const userLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User
    .findOne({ email })
    .then(user => {

      if(!user) {
        return res
          .status(404)
          .send({email: 'User not found'});
      }

      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {

            const payload = {
              id:user.id,
              name: user.name,
              avatar: user.avatar,
            };

            jwt.sign(payload, secretKeys, { expiresIn: 3600 }, (err, token) => {
              res.json({success:true, token: `Bearer ${token}`});
            });
          }else {
            return res
              .status(400)
              .json({password: 'Password incorrect'});
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

router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});

module.exports = router;
