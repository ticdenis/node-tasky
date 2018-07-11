'use strict';

const tasky = require('./../index'); // require('node-tasky');

const config = {
  css: {
    output: `${__dirname}/dist/styles.min.css`,
    input: [
      `${__dirname}/assets/scss/file1.scss`,
      `${__dirname}/assets/scss/file2.scss`,
      `${__dirname}/assets/css/file1.css`,
      `${__dirname}/assets/css/file2.css`
    ]
  },
  js: {
    output: `${__dirname}/dist/scripts.min.js`,
    input: [
      `${__dirname}/assets/js/file1.js`,
      `${__dirname}/assets/js/file2.js`,
      `${__dirname}/assets/js/file3.js`
    ]
  }
};

const args = process.argv.slice(2);

if (args.length === 0) tasky.watchAll(config);
else if (args[0] === 'css') tasky.watchCSS(config.css.output, config.css.input);
else if (args[0] === 'js') tasky.watchJS(config.js.output, config.js.input);
