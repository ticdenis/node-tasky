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
    css: minifyCSS(translateResult.css),
    less: minifyLESS(translateResult.less),
    scss: minifySCSS(translateResult.scss),
    js: minifyJS(translateResult.js),
    ts: minifyTS(translateResult.ts),
  });
}

function minifyCSS(result) {
  return Object.assign({}, result, {
    inputs: !!result.inputs ? NodeSASS.renderSync(
      Object.assign({ data: result.inputs }, result.options)
    ).css.toString('utf8') || '' : ''
  });
}

function minifyLESS(result) {
  return result;
}

function minifySCSS(result) {
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
