const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const Artist = require('../models/Artist');
const config = require('../config');
const User = require('../models/User');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

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
    const token = req.get('Authorization');
    const user = await User.findOne({token});
  
    let artists = await Artist.find({ publish: true });
  
    if (Boolean(user) && user.role !== 'admin') {
      const artistsUnpublish = await Artist.find({ publish: {$ne: true}, user: user._id });
      artists = [...artists, ...artistsUnpublish];
    } else if (Boolean(user) && user.role === 'admin') {
      artists = await Artist.find();
    }
  
    res.send(artists);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  const {title, information} = req.body;
  if (!title || !req.file.filename) {
    return res.status(400).send('Data not valid');
  }
  
  const artistData = {
    title,
    information: information || null,
    image: 'uploads/' + req.file.filename,
    user: req.user._id,
  };
  
  try {
    const artist = new Artist(artistData);
    await artist.save();
    
    res.send(artist);
  } catch (e) {
    res.status(400).send(e.errors);
  }
});

router.put('/:id/publish', auth, permit('admin'), async (req, res) => {
  try {
    const artist = await Artist.find({_id: req.params.id});
  
    if (!artist) {
      return res.status(404).send('Artist not found!');
    }
    
    const updateArtist = await Artist
      .findByIdAndUpdate(req.params.id, {publish: true});
    
    return res.send(updateArtist);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
  const id = req.params.id;
  try {
    const artist = await Artist.deleteOne({_id: id});
  
    if (artist) {
      res.send('Artist was removed');
    } else {
      res.status(404).send('Artist not found');
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;