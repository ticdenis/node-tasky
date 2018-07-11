'use strict';

const tasky = require('./../index'); // require('node-tasky');

const config = {
  css: {
    output: `dist/styles.min.css`,
    input: [
      `assets/scss/file1.scss`,
      `assets/scss/file2.scss`,
      `assets/css/file1.css`,
      `assets/css/file2.css`
    ]
  },
  js: {
    output: `dist/scripts.min.js`,
    input: [
      `assets/js/file1.js`,
      `assets/js/file2.js`,
      `assets/js/file3.js`
    ]
  }
};

const args = process.argv.slice(2);

if (args.length === 0) console.error('Nothing for Tasky');
else if (args[0] === 'all') {
  tasky.watchCSS(config.css.output, config.css.input);
  tasky.watchJS(config.js.output, config.js.input);
}
else if (args[0] === 'css') tasky.watchCSS(config.css.output, config.css.input);
else if (args[0] === 'js') tasky.watchJS(config.js.output, config.js.input);
