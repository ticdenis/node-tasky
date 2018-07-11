# Tasker

A simple JS (with Uglify) and SCSS/CSS (with node-sass) compiler and minifier.

## Installation

``` sh
npm i -D node-tasky
```

## Documentation

- Minify **JS**.

  `watchJS(output: string, input?: string[], options?: Object): Promise;`

- Compile and minify **SCSS/CSS**.

  `watchCSS(output: string, input?: string[], options?: Object): Promise;`

## Usage

```javascript
const tasky = require('node-tasky');

tasky.watchJS('dist/scripts.min.js', [
  'assets/js/file1.js',
  'assets/js/file2.js',
  'assets/js/file3.js'
]).then((err, code) => console.log('JS response', { err, code }));

tasky.watchCSS('dist/styles.min.css', [
  'assets/scss/file1.scss',
  'assets/scss/file2.scss',
  'assets/css/file1.css',
  'assets/css/file2.css'
]).then((err, code) => console.log('CSS response', { err, code });
```

## License

[MIT](https://github.com/ticdenis/tasky/blob/master/LICENSE)