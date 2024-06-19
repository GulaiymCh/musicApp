const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const Artist = require('../models/Artist');
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
    const artists = await Artist.find();
    
    res.send(artists);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const {title, information} = req.body;
  if (!title) {
    return res.status(400).send({error: 'Data not valid'});
  }
  
  const artistData = {
    title,
    information: information || null,
    image: req.file ? req.file.filename : null,
  };
  
  try {
    const artist = new Artist(artistData);
    await artist.save();
    
    res.send(artist);
  } catch (e) {
    res.status(400).send({error: e.errors});
  }
});

module.exports = router;