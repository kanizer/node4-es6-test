var argv = require('yargs').argv;

module.exports = {
  API_KEY: process.env.API_KEY || argv.API_KEY || 'your key',
  API_SECRET: process.env.API_SECRET || argv.API_SECRET || 'your secret',
  API_ENDPOINT: process.env.API_ENDPOINT || argv.API_ENDPOINT || 'https://your.api.path'
};
