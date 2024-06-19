const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const idvalidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

AlbumSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique'});
AlbumSchema.plugin(idvalidator, {message : 'Bad ID value for {PATH}'});
const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;