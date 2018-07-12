'use strict';

const fs = require('fs');

/**
 * Writes the input files (CSS/LESS/SCSS or TS/JS).
 * 
 * @param {Object} minifyResult
 */
module.exports = function (minifyResult, callback) {
  callback = callback || function () {};

  const stylesOuput = minifyResult.css.outputs[0];
  const stylesInput = [minifyResult.less.inputs, minifyResult.scss.inputs, minifyResult.css.inputs].join(' ');

  if (stylesOuput) {
    writeFile(stylesOuput, stylesInput, callback)
  }

  const scriptsOutput = minifyResult.js.outputs[0];
  const scriptsInput = [minifyResult.ts.inputs, minifyResult.js.inputs].join(' ');

  if (scriptsOutput) {
    writeFile(scriptsOutput, scriptsInput, callback)
  }
}

/**
 * Write the content to the output file.
 * 
 * @param {String} output 
 * @param {String} input 
 * @param {Function=} fn 
 */
function writeFile(output, input, fn) {
  fs.truncate(output, 0, function () {
    fs.writeFile(output, input, fn);
  });
}