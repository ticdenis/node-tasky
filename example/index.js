'use strict';

const tasky = require('./../index'); // require('node-tasky');

tasky.watchCSS('dist/styles.min.css', [
  'assets/scss/file1.scss',
  'assets/scss/file2.scss',
  'assets/css/file1.css',
  'assets/css/file2.css'
]);

tasky.watchJS('dist/scripts.min.js', [
  'assets/js/file1.js',
  'assets/js/file2.js',
  'assets/js/file3.js'
]);
