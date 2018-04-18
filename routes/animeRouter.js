var express = require('express');
var router = express.Router();
var Anime = require('../models/anime');

router.use(express.json());

//get animeList OK
router.get('/', (req, res, next) => {
  Anime.find({}, {'title': 1, 'img':1})
  .then((animeList) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(animeList);
  })
  .catch((err) => (next(err)));
});

//insert anime OK
router.post('/', (req, res, next) => {
  Anime.create(req.body)
  .then((anime) => {
    res.setHeader('Content-Type', 'application/json');
    res.setStatus = 200;
    res.json({success: true, anime: anime});
  })
  .catch((err) => (next(err)));
});

//retreive anime full OK
router.get('/:id', (req, res, next) => {
  var anime_id = req.params.id;
  Anime.findById(anime_id)
  .populate({path: 'arcs', populate: {path: 'episodes'}})
  .then((anime_full) => {
    res.setHeader('Content-Type', 'application/json');
    res.setStatus = 200;
    res.json(anime_full);
  })
  .catch((err) => next(err));
});

//retreive anime and saghe OK
router.get('/:id/arcs', (req, res, next) => {
  var anime_id = req.params.id;
  Anime.findById(anime_id)
  .populate({path: 'arcs'})
  .then((anime) => {
    res.setHeader('Content-Type', 'application/json');
    res.setStatus = 200;
    res.json(anime);
  })
  .catch((err) => (next(err)));
});

//insert saga OK
router.post('/:id/arcs', (req, res, next) => {
  var anime_id = req.params.id;
  var arc = req.body;
  arc.episodes = [];
  Anime.findByIdAndUpdate(anime_id, { $push: { 'arcs': arc}})
  .then((anime) => {
    res.setHeader('Content-Type', 'application/json');
    res.setStatus = 200;
    res.json({success: true});
  })
  .catch((err) => next(err));
});


//insert episode OK
router.post('/:id/arcs/:arc_n/episodes', (req, res, next) => {
  var anime_id = req.params.id;
  var arc_n = req.params.arc_n;
  var episode = req.body;
  Anime.findById(anime_id)
  .then((anime) => {
    anime.arcs[arc_n].episodes.push(episode);
    anime.save()
    .then(() => {
      res.setHeader('Content-Type', 'application/json');
      res.setStatus = 200;
      res.json({success: true});
    });
  })
  .catch((err) => next(err));
});

module.exports = router; 