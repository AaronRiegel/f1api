const season = require("../models/season");
module.exports = (function () {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const season = require('../models/season');


  //Generic Calendar route
  router.get('/calendar', function (req, res) {
    season.getCalendar().then(data => {

      res.send(data);
    });

    console.log("Hello from the route.");
  }); 

  //Specific Round route
  router.get('/calendar/:round', function (req, res) {
    season.getCalendar(req.params.round).then(data => {

      res.send(data);
    });
  });

  //Historic Round route
  router.get('/historic', function (req, res) {
    season.getHistoricCalendar(req.params.round).then(data => {

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