'use strict';

const NodeLESS = require('less');
const NodeSASS = require('node-sass');

/**
 * Translate (transpile and/or compile) the input files (CSS/LESS/SCSS or TS/JS).
 * 
 * @param {Object} readResult
 * 
 * @return {Promise} TranslateResult
 */
module.exports = function (readResult) {
  return translateLESS(readResult.less).then(function(lessTranslateResult) {
    return Promise.resolve({
      css: translateCSS(readResult.css),
      less: lessTranslateResult,
      scss: translateSCSS(readResult.scss),
      js: translateJS(readResult.js),
      ts: translateTS(readResult.ts),
    });
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
  NodeLESS.renderSync = function (input, options) {
    var self = this;
    return new Promise(function(resolve, reject) {
      if (!options || typeof options != "object") options = {};
      options.sync = true;
      self.render(input, options, function (err, result) {
          if (err) reject(err);
          resolve(result.css);
      });
    });
  };

  return NodeLESS.renderSync(result.inputs).then(function(css) {
    return Promise.resolve(Object.assign({}, result, { inputs: css }));
  });
  
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
