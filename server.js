const express = require('express');
const mongoose = require('mongoose');

const db = require('./config/key').mongoURI;

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

mongoose
  .connect(db)
  .then(() => console.log('mongo db connected'))
  .catch(e => console.log('err connecting database', e));

app.get('/', (req, res) => res.send('working'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
