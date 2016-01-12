var authService = require('../services/authService');
var logger = require('../utils/logger');

exports.authenticateUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (username && password) {
    authService.authenticateUser(username, password)
      .then(function (body) {
        console.log('authController.js: body:', body);
        res.send(body);
      })
      .catch(function (err) {
        console.log('authController.js: err:', err);
        throw err;
      });
  }
  else {
    throw new Error('Invalid query. Must include both username and password');
  }
};

