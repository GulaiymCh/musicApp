const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const auth = require("../middleware/auth");
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const populate = {
      path: "track",
      populate: {
        path: "album",
        select: "title",
        populate: {
          path: "artist",
          select: "title"
        },
      },
      select: "title mp3"
    };
    
    const trackHistory = await TrackHistory
      .find({user: req.user._id})
      .sort({datetime: -1})
      .populate(populate);
  
    res.send(trackHistory);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/secret', auth, async (req, res) => {
  if (!req.body.track) {
    return res.status(400).send({error: 'Data not valid'});
  }

  try {
    const trackOld = await TrackHistory.findOne({track: new mongoose.Types.ObjectId(req.body.track)});

    if(trackOld) {
      await TrackHistory.deleteOne({_id: trackOld._id});
    }

    const trackHistoryData = {
      track: req.body.track,
      user: req.user._id,
    };
    const trackHistory = new TrackHistory(trackHistoryData);
  
    await trackHistory.save();
    res.send(trackHistory);
  } catch (e) {
    res.status(400).send({error: e.errors});
  }
});

module.exports = router;