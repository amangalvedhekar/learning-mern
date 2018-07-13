const express = require('express');
const gravator = require('gravatar');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../../models/User');


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

/**
 * @route {POST} api/users/register
 * @authentication Public
 */
router.post('/register', userRegistration);


module.exports = router;
