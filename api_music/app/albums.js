const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const Album = require('../models/Album');
const config = require('../config');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});
const upload = multer({storage});

router.get('/', async (req, res) => {
  try {
    if (req.query.artist) {
      const artistAlbums = await Album
        .find({artist: req.query.artist})
        .sort({date: 1})
        .populate('artist');
      
      res.send(artistAlbums);
    } else {
      const albums = await Album
        .find()
        .populate('artist');
      
      res.send(albums);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const album = await Album
      .findById(req.params.id)
      .populate('artist');
  
    res.send(album);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const {title, artist, date} = req.body;
  if (!title || !artist || !date) {
    return res.status(400).send({error: 'Data not valid'});
  }
  
  if (isNaN(new Date(date))) {
    return res.status(400).send({error: 'Date is incorrect'});
  }
  
  const albumData = {
    title,
    artist,
    date,
    image: req.file ? req.file.filename : null,
  };
  
  try {
    const album = new Album(albumData);
    await album.save();
    
    res.send(album);
  } catch (e) {
    res.status(400).send({error: e.errors});
  }
});

module.exports = router;