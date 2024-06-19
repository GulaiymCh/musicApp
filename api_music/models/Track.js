const mongoose = require("mongoose");
const idvalidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true
  },
  publish: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mp3: String
});

TrackSchema.plugin(idvalidator, {message : 'Bad ID value for {PATH}'});
const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;