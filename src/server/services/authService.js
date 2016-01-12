var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var nconf = require('nconf');
var merge = require('merge');
var logger = require('../utils/logger');

var ACCESS_TOKEN_URL = nconf.get('API_ENDPOINT') + '/oauth2/access_token';

// region Application Authentication

exports.authenticateApp = function () {
  return new Promise.resolve(getAccessToken());
};

// endregion

// region User Authentication

exports.authenticateUser = function (username, password) {
  var formData = {
    username: username,
    password: password,
    'grant_type': 'password'
  };

  return new Promise(function (resolve, reject) {
    getFreshAccessToken(formData)
      .spread(function (resp, body) {
        cacheAccessToken(body);
        resolve(body);
      })
      .catch(function (err) {
        reject(err);
      })
    ;
  });
};

// endregion

// region Helper

var getAccessToken = function () {
  // check for existing access token
  var cachedAccessObj = getCachedAccessToken();
  if (cachedAccessObj &&
      cachedAccessObj.token_type &&
      cachedAccessObj.access_token) {
    return new Promise.resolve(cachedAccessObj);
  }

  // or get a new one
  return new Promise(function (resolve, reject) {
    getFreshAccessToken()
      .spread(function (resp, body) {
        cacheAccessToken(body);
        logger.log('\n\nWTF')
        resolve(body);
      })
      .catch(function (err) {
        logger.error('\n\nWTF')
        reject(err);
      });
  });
};

// TODO Antoine: SHOULD BE REMOVED IN FAVOR OF authenticateApp()
exports.getAccessToken = function() {
  return new Promise.resolve(getAccessToken());
};

var getFreshAccessToken = function (props) {
  // Set default form body data
  var formData = {
    'client_id': nconf.get('API_KEY'),
    'client_secret': nconf.get('API_SECRET'),
    'grant_type': 'client_credentials'
  };

  // merge additional props, this is for login
  if (props) {
    formData = merge(formData, props);
  }

  logger.log(ACCESS_TOKEN_URL);

  return request.postAsync({
    url: ACCESS_TOKEN_URL,
    json: true,
    form: formData
  });
};

// endregion

// region Access Token Cache

var cacheAccessToken = function (accessTokenObject) {
  if (accessTokenObject &&
      accessTokenObject.token_type &&
      accessTokenObject.access_token) {
    nconf.use('memory');
    nconf.set('auth:token_type', accessTokenObject.token_type);
    nconf.set('auth:access_token', accessTokenObject.access_token);

    return getCachedAccessToken();
  }
};

var getCachedAccessToken = function () {
  return nconf.get('auth');
};

// endregion
