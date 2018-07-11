'use strict';

const fs = require('fs');
const watch = require('node-watch');

const UglifyJS = require('uglify-es');
const UglifyCSS = require('node-sass');

/**
 * Listens, reads, mingles and writes incoming JS and SCSS/CSS files to a unique output file.
 * 
 * @param {Object} config 
 */
function watchAll(config) {
  config = Object.assign({}, { css: { output: null, input: [], options: {} }, js: { output: null, input: [], options: {} } }, config);
  const promises = [];
  
  if (config.css && config.css.output) {
    promises.push(watchCSS(config.css.output, config.css.input, config.css.options));
  }

  if (config.js && config.js.output) {
    promises.push(watchJS(config.js.output, config.js.input, config.js.options));
  }

  return Promise.all(promises);
}

/**
 * Listens, reads, mingles and writes incoming SCSS/CSS files to a unique output file.
 * 
 * @param {String} output Path of the resulting file
 * @param {Array<String>=} input Relative path of files
 * @param {Object=} options https://www.npmjs.com/package/node-sass#options
 */
function watchCSS (output, input, options) {
  options = Object.assign({
    outputStyle: 'compressed'
  }, options || {});

  runCSS(function (err) {
    if (err) throw err;
  });

  return new Promise(function (resolve) {
    console.log('Tasky > Listening SCSS/CSS...');
    (input || []).forEach(function (path) {
      watch(path, function () {
        runCSS(function (err, code) {
          resolve({err, code});
        });
      })
    });
  });

  /**
   * Reads, Minify and Writes the input SCSS/CSS files to the output CSS file.
   * 
   * @param {Function=} fn 
   */
  function runCSS(fn) {
    fn = fn || function () {};
    const cssReaded = readFiles(input);
    const cssMinified = minifyCSS(cssReaded, options);
    writeFile(output, cssMinified, function (err) {
      if (err) return fn(err, null);
      console.log('Tasky > SCSS/CSS compiled!');
      fn(null, cssMinified.code);
    });
  }

  /**
   * Minify the content of incoming SCSS/CSS files.
   * 
   * @param {String?} content 
   * @param {Object?} options 
   */
  function minifyCSS(content, options) {
    return UglifyCSS.renderSync(Object.assign({ data: content || '' }, options)).css || '';
  }
}

/**
 * Listens, reads, mingles and writes incoming JavaScript files to a unique output file.
 * 
 * @param {String} output Path of the resulting file
 * @param {Array<String>=} input Relative path of files
 * @param {Object=} options https://www.npmjs.com/package/uglify-es#minify-options
 */
function watchJS (output, input, options) {
  options = Object.assign({
    toplevel: false,
    mangle: false,
    ie8: true,
    compress: {
      sequences: false
    }
  }, options || {});

  runJS(function (err) {
    if (err) throw err;
  });

  return new Promise(function (resolve) {
    console.log('Tasky > Listening JS...');
    (input || []).forEach(function (path) {
      watch(path, function () {
        runJS(function (err, code) {
          resolve({err, code});
        });
      })
    });
  });

  /**
   * Reads, Minify and Writes the input JavaScript files to the output JavaScript file.
   * 
   * @param {Function=} fn 
   */
  function runJS(fn) {
    fn = fn || function () {};
    const jsReaded = readFiles(input);
    const jsMinified = minifyJS(jsReaded, options);
    writeFile(output, jsMinified, function (err) {
      if (err) return fn(err, null);
      console.log('Tasky > JS compiled!');
      fn(null, jsMinified.code);
    });
  }

  /**
   * Minify the content of incoming JavaScript files.
   * 
   * @param {String?} content 
   * @param {Object?} options 
   */
  function minifyJS(content, options) {
    return UglifyJS.minify(content || '', options).code || '';
  }
}

/**
 * Write the content to the output file.
 * 
 * @param {String} output 
 * @param {String=} content 
 * @param {Function=} fn 
 */
function writeFile(output, content, fn) {
  fs.truncate(output, 0, function () {
    fs.writeFile(output, content || '', fn || function () {});
  });
}

/**
 * Reads and joins the contents of the input files.
 * 
 * @param {Array<String>} input 
 */
function readFiles(input) {
  return input.map(function (file) {
    return fs.readFileSync(file, 'utf8');
  }).join(' ') || '';
}

module.exports = {
  watchAll,
  watchCSS,
  watchJS
};
