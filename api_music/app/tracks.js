const express = require('express');
const Track = require('../models/Track');
const auth = require("../middleware/auth");
const permit = require('../middleware/permit');
const multer = require('multer');
const config = require('../config');
const {nanoid} = require('nanoid');
const path = require('path');

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

router.get('/', auth, async (req, res) => {
  try {
    if (req.query.album) {
      const populate = {
        path: "album",
        populate: {
          path: "artist",
          select: "title"
        },
        select: "title"
      };

      if (req.user.role === 'admin') {
        const tracks = await Track.find({album: req.query.album}).sort({number: 1}).populate(populate);
        return res.send(tracks);
      }

      let tracks = await Track.find({ album: req.query.album, publish: true }).sort({number: 1}).populate(populate);
      const tracksUnpublish = await Track.find({ album: req.query.album, publish: false, user: req.user._id }).sort({number: 1}).populate(populate);
      tracks = [...tracks, ...tracksUnpublish];

      res.send(tracks);
    } else {
      if (req.user.role === 'admin') {
        const tracks = await Track.find().sort({number: 1}).populate('album', '_id, title');
        return res.send(tracks);
      }
  
      let tracks = await Track.find({ publish: true }).sort({number: 1}).populate('album', '_id, title');
      const tracksUnpublish = await Track.find({ publish: false, user: req.user._id }).sort({number: 1}).populate('album', '_id, title');
      tracks = [...tracks, ...tracksUnpublish];
      
      res.send(tracks);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth,upload.single('mp3'), async (req, res) => {
  const {title, album, duration} = req.body;
  if (!title || !album || !duration) {
    return res.status(400).send({error: 'Data not valid'});
  }
  
  const tracks = await Track.find();
  
  const trackData = {
    title,
    album,
    duration,
    number: tracks ? tracks[tracks.length - 1].number + 1 : 1,
    mp3: 'uploads/' + req.file.filename,
    user: req.user._id,
  };
  
  try {
    const track = new Track(trackData);
    await track.save();
    
    res.send(track);
  } catch (e) {
    res.status(400).send(e.errors);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
  const id = req.params.id;
  try {
    const track = await Track.deleteOne({_id: id});
    
    if (track) {
      res.send('Track was removed');
    } else {
      res.status(404).send('Track not found');
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

router.put('/:id/publish', auth, permit('admin'), async (req, res) => {
  try {
    const track = await Track.find({_id: req.params.id});
    
    if (!track) {
      return res.status(404).send('Track not found!');
    }
    
    const updateTrack = await Track
      .findByIdAndUpdate(req.params.id, {publish: true});
    
    return res.send(updateTrack);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;