'use strict';

const fs = require('fs');

/**
 * Reads the input files (CSS/LESS/SCSS or TS/JS).
 * 
 * @param {Object} arrangeResult
 * 
 * @return {Promise} ListenResult
 */
module.exports = function (arrangeResult) {
  return Promise.resolve({
    css: Object.assign({}, arrangeResult.css, { inputs: readFiles(arrangeResult.css.inputs) }),
    less: Object.assign({}, arrangeResult.less, { inputs: readFiles(arrangeResult.less.inputs) }),
    scss: Object.assign({}, arrangeResult.scss, { inputs: readFiles(arrangeResult.scss.inputs) }),
    js: Object.assign({}, arrangeResult.js, { inputs: readFiles(arrangeResult.js.inputs) }),
    ts: Object.assign({}, arrangeResult.ts, { inputs: readFiles(arrangeResult.ts.inputs) })
  });
}

/**
 * Reads and joins the contents of the input files.
 * 
 * @param {Array<String>} input 
 * 
 * @return {String}
 */
function readFiles(files) {
  return files.map(function (file) {
    return fs.readFileSync(file, 'utf8');
  }).join(' ');
}