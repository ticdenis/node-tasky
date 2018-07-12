'use strict';

const NodeWatch = require('node-watch');

/**
 * Listen the input files (CSS/LESS/SCSS or TS/JS).
 * 
 * @param {Object} arrangeResult
 * @param {Function} callback
 */
module.exports = function (arrangeResult, callback) {
  callback = callback || function () {}

  let files = [];
  for (const lang in arrangeResult) {
    files = files.concat(arrangeResult[lang].inputs);
  }

  files.forEach(function (file) {
    NodeWatch(file, function () {
      callback(arrangeResult);
    });
  });
}
