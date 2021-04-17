module.exports = (function () {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var season = require('../models/season');




  //Generic Calendar route
  router.get('/calendar', function (req, res) {
    season.getCalendar().then(data => {

      res.send(data);
    });
  }); 

  //Specific Round route
  router.get('/calendar/:round', function (req, res) {
    season.getCalendar(req.params.round).then(data => {

      res.send(data);
    });
  });

  // About route
  router.get('/about', function (req, res) {
    let description = {
      description : "A wrapper API for the Ergast F1 API"
    }
    res.send(description);
  });

  return router;
})();