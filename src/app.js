const http = require('http');
const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
const ejs = require('ejs');
const morgan = require('morgan'); // htttp req logger
const bunyan = require('bunyan'); // nodejs logger
const nconf = require('nconf');
const constants = require('./server/constants');

// Configuration
nconf
  .env()
  .argv()
  .defaults(constants);

const isDev = nconf.get('NODE_ENV') === 'dev';


// Parent App
let app = express();


// debugger
let log = bunyan.createLogger({name: 'myapp'});
log.info('app.js: app:', app);
log.warn({lang: 'fr'}, 'au revoir');


// gzip
app.use(compression());


// Caching
let oneDayCache = '1d';


// Logging
app.use(morgan(isDev ? 'dev' : 'combined'));


// Service routes
let routes = require('./server/routes');
app.use('/api', routes);


// For client React Router purposes
let clientDir = __dirname + (isDev ? '/public/' : '/dist/');
let client = express();

client.use(serveStatic(clientDir, {
  maxAge: oneDayCache
}));

client.engine('html', ejs.renderFile);
client.set('views', clientDir);
client.set('view engine', 'html');

client.get('/tests', function(req, res) {
  res.render('tests.html');
});

client.get('*', function(req, res) {
  res.render('index.html');
});

app.use('/', client);


// Fire it up!
// NOTE: Using the http module because this is what
// express does internally anyway
let port = 8080;
http.createServer(app).listen(port, function () {
  log.info('HTTP Express server listening on port %s', port);
});
