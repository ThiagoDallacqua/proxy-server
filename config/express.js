const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const passport = require('passport');

module.exports = function() {
  const app = express();

  app.use(bodyParser.json());

  app.use(passport.initialize());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", ["http://localhost:5000", "http://localhost:3000", "http://localhost:3333"]);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

  consign()
  .include('controllers')
  .then('infra')
  .then('models')
  .then('utils')
  .then('middlewares')
  .into(app);

  return app
}
