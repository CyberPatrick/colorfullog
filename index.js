const chalk = require('chalk');

function warning(text) {
  console.log(stringDate() + chalk.keyword('yellow')('Warning! ') + chalk.bold(text));
}
function err(text) {
  console.log(stringDate() + chalk.bold.red('Error! ') + chalk.bold(text));
  process.exit();
}
function success(text) {
  console.log(stringDate() + chalk.bold.green('Success! ') + chalk.bold(text));
}
function log(text) {
  console.log(stringDate() + chalk.bold(text));
}
function stringDate() {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  return `${year}.${month < 10 ? '0' + month : month}.${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} `;
}

module.exports = {
  warning,
  success,
  log,
  err,
};