# Tasky

A simple JS and LESS/SCSS/CSS compiler and minifier.

## Installation

``` sh
npm i -D node-tasky
```

## Documentation

- Compile and minify **JS**.

  `watchJS(output: string, input?: string[], options?: Object): void;`

- Compile and minify **LESS/SCSS/CSS**.

  `watchCSS(output: string, input?: string[], options?: Object): void;`

## Usage

```javascript
const tasky = require('node-tasky');

tasky.watchJS('dist/scripts.min.js', [
  'assets/js/file1.js',
  'assets/js/file2.js',
  'assets/js/file3.js'
]);

tasky.watchCSS('dist/styles.min.css', [
  'assets/less/file1.less',
  'assets/scss/file1.scss',
  'assets/scss/file2.scss',
  'assets/css/file1.css',
  'assets/css/file2.css'
]);
```

## In progress

- Minify HTML.

- JS ES6/ES7 to ES5 with [Babel](https://github.com/babel/babel).

- TS to ES5 with [TypeScript](https://github.com/Microsoft/TypeScript).

- Support for multiples outputs, inputs and options.

## License

[MIT](https://github.com/ticdenis/node-tasky/blob/master/LICENSE)