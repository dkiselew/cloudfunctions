const moment = require('moment');

module.exports = function (context) {
  return {
    status: 200,
    //body: 'moment',
    body: moment().format(),
  }
}