'use strict';

const tasky = require('./../index'); // require('tasky');

const config = {
  css: {
    output: 'examples/dist/styles.min.css',
    input: [
      'examples/assets/scss/file1.scss',
      'examples/assets/scss/file2.scss',
      'examples/assets/css/file1.css',
      'examples/assets/css/file2.css'
    ]
  },
  js: {
    output: 'examples/dist/scripts.min.js',
    input: [
      'examples/assets/js/file1.js',
      'examples/assets/js/file2.js',
      'examples/assets/js/file3.js'
    ]
  }
};

const args = process.argv.slice(2);

if (args.length === 0) tasky.watchAll(config);
else if (args[0] === 'css') tasky.watchCSS(config.css.output, config.css.input);
else if (args[0] === 'js') tasky.watchJS(config.js.output, config.js.input);
