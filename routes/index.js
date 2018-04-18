var express = require('express');
var router = express.Router();
var Anime = require('../models/anime');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/anime');
});

module.exports = router;
