var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var episodeSchema = Schema({
  'title': {
    type: String,
  },
  'number': {
    type: Number,
    min: 1
  }
});

var arcSchema = Schema({
  'title': {
    type: String,
  },
  'opening': {
    type: String
  },
  'episodes': [episodeSchema]
});

var animeSchema = Schema({
  'title': {
    type: String,
    required: true,
    unique: true
  },
  'plot': {
    type: String,
    required: true
  },
  'img': {
    type: String,
    default: ''
  },
  'episodes_per_row': {
    type: Number,
    default: 5,
    min: 1,
    max: 10
  },
  'source_material': {
    type: String
  },
  'fansub': {
    type: String
  },
  'year': {
    type: Number,
    min: 1990,
    max: 2020
  },
  'arcs': [arcSchema]
});

var Anime = mongoose.model('anime', animeSchema);
module.exports = Anime;