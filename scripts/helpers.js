const moment = require('moment');
const fs = require('fs');
const path = require('path');

const generateRandomPasscode = () => {
  return new Array(10)
    .fill(null)
    .map(() => Math.floor(Math.random() * 9))
    .join('');
};

const logError = (errorMessage) => {
  const dateTime = moment(new Date(Date.now())).format("YYYY-MM-DD HH:mm:ss");
  const message = `[${dateTime}] - ${errorMessage}\n`;
  fs.appendFileSync(path.join(process.cwd(), './errors.log'), message, 'utf8');
};

module.exports = {
  generateRandomPasscode,
  logError,
};
