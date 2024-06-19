const express = require('express');
const Track = require('../models/Track');
const Artist = require("../models/Artist");
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    if (req.query.album) {
      const tracksInAlbum = await Track
        .find({album: req.query.album})
        .sort({number: 1})
        .populate('album');
      
      const artistData = await Artist.findById({_id: tracksInAlbum[0].album.artist});
      
      res.send({tracks: tracksInAlbum, artist: artistData.title});
    } else {
      const tracks = await Track
        .find()
        .populate('album', '_id, title');
      
      res.send(tracks);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});


module.exports = router;