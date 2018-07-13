const express = require('express');
const mongoose = require('mongoose');

const db = require('./config/key').mongoURI;

const app = express();

mongoose
  .connect(db)
  .then(() => console.log('mongo db connected'))
  .catch(e => console.log('err connecting database', e));

app.get('/', (req, res) => res.send('working'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
