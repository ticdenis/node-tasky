'use strict';

const NodeSASS = require('node-sass');

/**
 * Translate (transpile and/or compile) the input files (CSS/LESS/SCSS or TS/JS).
 * 
 * @param {Object} readResult
 * 
 * @return {Promise} TranslateResult
 */
module.exports = function (readResult) {
  return Promise.resolve({
    css: translateCSS(readResult.css),
    less: translateLESS(readResult.less),
    scss: translateSCSS(readResult.scss),
    js: translateJS(readResult.js),
    ts: translateTS(readResult.ts),
  });
}

function translateCSS(result) {
  return Object.assign({}, result, {
    inputs: !!result.inputs ? NodeSASS.renderSync(
      Object.assign({ data: result.inputs }, result.options)
    ).css.toString('utf8') || '' : ''
  });
}

function translateLESS(result) {
  return result;
}

function translateSCSS(result) {
  return Object.assign({}, result, {
    inputs: !!result.inputs ? NodeSASS.renderSync(
      Object.assign({ data: result.inputs }, result.options)
    ).css.toString('utf8') || '' : ''
  });
}

function translateJS(result) {
  return result;
}

function translateTS(result) {
  return result;
}
