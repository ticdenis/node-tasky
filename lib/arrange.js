'use strict';

/**
 * Prepares the output file (CSS or JSS) and the input files (CSS/LESS/SCSS or TS/JS).
 * 
 * @param {String|Array<String>} output Output file(s)
 * @param {String|Array<String>} input Input file(s)
 * @param {Object} options Options object
 * @param {String} dirname
 * 
 * @return {Promise} ArrangeResult
 */
module.exports = function (output, input, options, dirname) {
  // Sanitize format args
  output = Array.isArray(output) ? output : [output];
  input = Array.isArray(input) ? input : [input];
  options = options || {};
  // Sanitize value args
  output = output.map(function(o) { return dirname + (o[0] === '/' ? o : '/' + o); });
  input = input.map(function(i) { return dirname + (i[0] === '/' ? i : '/' + i); });
  // Split args per language
  const outputs = splitLanguages(output);
  const inputs = splitLanguages(input);
  // Merge args per language
  return Promise.resolve({
    css: mergeLanguages(outputs.css, inputs.css, options.css || defaultOptions.css),
    less: mergeLanguages(outputs.less, inputs.less, options.less || defaultOptions.less),
    scss: mergeLanguages(outputs.scss, inputs.scss, options.scss || defaultOptions.scss),
    js: mergeLanguages(outputs.js, inputs.js, options.js || defaultOptions.js),
    ts: mergeLanguages(outputs.ts, inputs.ts, options.ts || defaultOptions.ts),
  });
}

function splitLanguages(files) {
  return {
    css: files.filter(function (file) { return file.indexOf('.css') > -1; }),
    less: files.filter(function (file) { return file.indexOf('.less') > -1; }),
    scss: files.filter(function (file) { return file.indexOf('.scss') > -1 }),
    js: files.filter(function (file) { return file.indexOf('.js') > -1; }),
    ts: files.filter(function (file) { return file.indexOf('.ts') > -1; }),
  };
}

function mergeLanguages(outputs, inputs, options) {
  return { outputs, inputs, options };
}

const defaultOptions = {
  css: {
    outputStyle: 'compressed'
  },
  less: {
    outputStyle: 'compressed'
  },
  scss: {
    outputStyle: 'compressed'
  },
  js: {
    toplevel: false,
    mangle: false,
    ie8: true,
    compress: {
      sequences: false
    }
  },
  ts: {}
};
