const express = require('express');
const router = express.Router();


const resMessage = {
  msg: 'profile works',
};

const test = (req, res) => {
  res.json(resMessage);
};

router.get('/test', test);

module.exports = router;
