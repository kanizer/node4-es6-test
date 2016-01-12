var chalk = require('chalk');

function concat(args) {
  var s = '',
    item;

  for (var i = 0; i < args.length; i++) {
    item = args[i];
    item = item instanceof Object ? JSON.stringify(item) : item;
    s += s === '' ? item : ', ' + item;
  }
  return s;
}

var log = {
  log: function () {
    console.log(chalk.blue(concat(arguments)));
  },
  error: function () {
    console.log(chalk.red(concat(arguments)));
  }
};

module.exports = log;
