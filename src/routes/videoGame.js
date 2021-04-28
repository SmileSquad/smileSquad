'use strict';

const express = require('express');
const router = express.Router();

router.get('/playerDisc/:id', (req, res) => {
  //--make update and increase value for player id params
  res.status(200).render('playerDisc.ejs');
});

router.get('/pvp/', (req, res) => {
  res.render('pvp.ejs', {
    Private: false,
    Room: undefined,
    roomId: 'req.params.room',
  });
});

router.get('/loser/:id', (req, res) => {
  //--make update and increase value for player id params
  res.status(200).render('loser.ejs');
});
router.get('/winner/:id', (req, res) => {
  //--make update and increase value for player id params
  res.status(200).render('winner.ejs');
});

module.exports = router;
