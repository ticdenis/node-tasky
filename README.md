# Tasky

A simple JS (with [uglify-es](https://www.npmjs.com/package/uglify-es#minify-options)) and SCSS/CSS (with [node-sass](https://www.npmjs.com/package/node-sass#options)) compiler and minifier.

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

tasky.watchJS(`${__dirname}/dist/scripts.min.js`, [
  `${__dirname}/assets/js/file1.js`,
  `${__dirname}/assets/js/file2.js`,
  `${__dirname}/assets/js/file3.js`
]).then((err, code) => console.log('JS response', { err, code }));

tasky.watchCSS(`${__dirname}/dist/styles.min.css`, [
  `${__dirname}/assets/scss/file1.scss`,
  `${__dirname}/assets/scss/file2.scss`,
  `${__dirname}/assets/css/file1.css`,
  `${__dirname}/assets/css/file2.css`
]).then((err, code) => console.log('CSS response', { err, code });
```

## License

[MIT](https://github.com/ticdenis/node-tasky/blob/master/LICENSE)