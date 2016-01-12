var express = require('express');
var bodyParser = require('body-parser');
var authController = require('./controllers/authController');

// Create app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Allow CORS for tests
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Authentication Controller Routes
app.post('/authenticate', authController.authenticateUser);

module.exports = app;
