const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const Album = require('../models/Album');
const config = require('../config');
const auth = require('../middleware/auth');
const User = require('../models/User');
const permit = require('../middleware/permit');
const Track = require('../models/Track');
const TrackHistory = require('../models/TrackHistory');

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
      const token = req.get('Authorization');
      const user = await User.findOne({token});
  
      let albums = await Album.find({ artist: req.query.artist, publish: true }).sort({date: 1}).populate('artist');
      if (Boolean(user) && user.role !== 'admin') {
        const albumsUnpublish = await Album.find({ artist: req.query.artist, publish: false, user: user._id }).sort({date: 1}).populate('artist');
        albums = [...albums, ...albumsUnpublish];
      } else if (Boolean(user) && user.role === 'admin') {
        albums = await Album.find({artist: req.query.artist}).sort({date: 1}).populate('artist');
      }
      
      res.send(albums);
    } else {
      const token = req.get('Authorization');
      const user = await User.findOne({token});
  
      let albums = await Album.find({ publish: true }).populate('artist');
      if (Boolean(user) && user.role !== 'admin') {
        const artistsUnpublish = await Album.find({ publish: false, user: user._id }).populate('artist');
        albums = [...albums, ...artistsUnpublish];
      } else if (Boolean(user) && user.role === 'admin') {
        albums = await Album.find().populate('artist');
      }
      
      res.send(albums);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/unPublished', auth, permit('admin'), async (req, res) => {
  try {
    const albums = await Album.find({ publish: false }).populate('artist');

    res.send(albums);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const token = req.get('Authorization');
    const user = await User.findOne({token});

    let album = await Album.find({ _id: req.params.id, publish: true });
    if (Boolean(user) && user.role !== 'admin') {
      const artistsUnpublish = await Album.find({ publish: false, user: user._id, _id: req.params.id });
      album = [...album, ...artistsUnpublish];
    } else if (Boolean(user) && user.role === 'admin') {
      album = await Album.find({_id: req.params.id});
    }
    res.send(album[0]);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
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
    image: req.file ? 'uploads/' + req.file.filename : null,
    user: req.user._id,
  };
  
  try {
    const album = new Album(albumData);
    await album.save();
    
    res.send(album);
  } catch (e) {
    res.status(400).send(e.errors);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
  const id = req.params.id;
  try {
    const trackF = await Track.find({ album: id });
    const trackIds = trackF.map(track => track._id);

    await TrackHistory.deleteMany({ track: { $in: trackIds } });
    await Track.deleteMany({ album: id });
    const album = await Album.deleteOne({ _id: id });

    res.send(album);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.put('/:id/publish', auth, permit('admin'), async (req, res) => {
  try {
    const album = await Album.find({_id: req.params.id});
    
    if (!album) {
      return res.status(404).send('Album not found!');
    }
    
    const updateAlbum = await Album
      .findByIdAndUpdate(req.params.id, {publish: true});
    
    return res.send(updateAlbum);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;