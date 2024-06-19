const express = require('express');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const cors = require('cors');
const albums = require('./app/albums');
const artists = require('./app/artists');
const tracks = require('./app/tracks');
const users = require('./app/users');
const trackHistory = require('./app/trackHistory');
const config = require('./config');

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/albums', albums);
app.use('/artists', artists);
app.use('/tracks', tracks);
app.use('/users', users);
app.use('/track_history', trackHistory);

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);
  
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
  
  exitHook(() => {
    mongoose.disconnect();
    console.log('MongoDb disconnect');
  });
};

run().catch(e => console.error(e));