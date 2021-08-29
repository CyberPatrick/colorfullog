const chalk = require('chalk');
const cursor = require('ansi')(process.stdout);

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
class Loading {
  /**
   * @param {String} name - Header 
   */
  constructor(name) {
    this.progress = 0;
    this.name = chalk.bold.black(name);
    this.progressBar = '####################';
    this.anim = ['|', '/', '-', '\\'];
    this.animState = -1;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(this.name + ' ' + this._formProgressBar() + ` ${chalk.bold.white(this.progress + '%')}`);
    this.start = process.hrtime.bigint();
    this.current = '';
    this.state = 'progress';
  }
  /**
   * @param {Number} progress - add number from 1 - 100 to progress
   * @param {String} state - What is going on now, may be empty so last state will be using
   */
  pipe(progress, state) {
    progress = parseInt(progress);
    if (isNaN(progress)) throw new Error('Parameter progress must be a number');
    if (state) {
      this.current = state;
    } else {
      this.current = 0;
    }
    this.progress += progress;
    if (this.progress < 100) {
      this.animState++;
      if (this.animState === 4) this.animState = 0;
      process.stdout.cursorTo(0);
      process.stdout.clearLine();
      process.stdout.write(this.name + ' ' + this._formProgressBar() + ` ${chalk.bold.white(this.progress + '%')} ` + this.current + ` ${this.anim[this.animState]}` );
    } else {
      if (this.state === 'progress') {
        process.stdout.cursorTo(0);
        process.stdout.clearLine();
        process.stdout.write('Finished ' + this.name + ` with ${(process.hrtime.bigint() - this.start) / 1000000000n}s`);
        this.state = 'finish';
      }
    }
  }
  _formProgressBar() {
    const index = this.progressBar.search('#');
    if (this.progress % 5 === 0 && this.progress !== 0) {
      this.progressBar = this.progressBar.slice(0, index) + '/' + this.progressBar.slice(index + 1);
    }
    return chalk.bgGreen.green(this.progressBar.slice(0, index)) + chalk.bgWhite.white(this.progressBar.slice(index));
  }
}

class SimpleLoading {
  constructor(name) {
    this.name = chalk.bold.black(name) ?? chalk.bold.black('Loading');
    this.anim = [chalk.red('|'), chalk.red('/'), chalk.red('-'), chalk.red('\\')];
    this.animState = -1;
    cursor.hide();
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(this.name);
    this.start = process.hrtime.bigint();
    this.loading = setInterval(() => {
      this.animState++;
      if (this.animState === 4) this.animState = 0;
      process.stdout.cursorTo(name.length); // this.name -> longer, due to chalk.red()
      process.stdout.clearLine(1);
      process.stdout.write(` ${this.anim[this.animState]}`);
    }, 100);
  }

  stop() {
    clearInterval(this.loading);
    process.stdout.cursorTo(0);
    process.stdout.clearLine();
    process.stdout.write('Finished ' + this.name + ` with ${(process.hrtime.bigint() - this.start) / 1000000000n}s\n`);
    cursor.show();
  }
}

module.exports = {
  warning,
  success,
  log,
  err,
  Loading,
  SimpleLoading,
};