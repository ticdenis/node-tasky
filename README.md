# Tasker

A simple JS (with Uglify) and SCSS/CSS (with node-sass) compiler and minifier.

## Installation

``` sh
npm i -D tasky
```

## Documentation

- Minify **JS**.

  `watchJS(output: string, input?: string[], options?: Object): Promise;`

- Compile and minify **SCSS/CSS**.

  `watchCSS(output: string, input?: string[], options?: Object): Promise;`

## Usage

```javascript
const tasky = require('tasky');

tasky.watchJS('dist/scripts.min.js', [
  'assets/js/file1.js',
  'assets/js/file2.js',
  'assets/js/file3.js'
]).then(result => console.log('JS OK'));

tasky.watchCSS('dist/styles.min.css', [
  'assets/scss/file1.scss',
  'assets/scss/file2.scss',
  'assets/css/file1.css',
  'assets/css/file2.css'
]).then(result => console.log('SCSS/CSS OK'));
```

## License

[MIT](https://github.com/ticdenis/tasky/src/master/LICENSE)