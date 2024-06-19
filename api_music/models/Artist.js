const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  information: String,
  image: {
    type: String,
    required: true,
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
  }
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;