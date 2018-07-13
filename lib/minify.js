'use strict';

const UglifyES = require('uglify-es');
const NodeSASS = require('node-sass');

/**
 * Minify the input files (CSS/LESS/SCSS or TS/JS).
 * 
 * @param {Object} translateResult
 * 
 * @return {Promise} MinifyResult
 */
module.exports = function (translateResult) {
  return Promise.resolve({
    css: minifyStyles(translateResult.css),
    less: minifyStyles(translateResult.less),
    scss: minifyStyles(translateResult.scss),
    js: minifyJS(translateResult.js),
    ts: minifyTS(translateResult.ts),
  });
}

function minifyStyles(result) {
  return Object.assign({}, result, {
    inputs: !!result.inputs ? NodeSASS.renderSync(
      Object.assign({ data: result.inputs }, result.options)
    ).css.toString('utf8') || '' : ''
  });
}

function minifyJS(result) {
  return Object.assign({}, result, {
    inputs: UglifyES.minify(result.inputs, result.options).code || ''
  });
}

function minifyTS(result) {
  return result;
}
