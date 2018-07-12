'use strict';

const callsite = require('callsite');
const path = require('path');

const {
  arrange, listen, read, translate, minify, write
} = require('./lib');

class Tasky {

  /**
   * A simple JS and SCSS/CSS compiler and minifier.
   */
  constructor() {
    this.arrange = arrange;
    this.listen = listen;
    this.read = read;
    this.translate = translate;
    this.minify = minify;
    this.write = write;
  }

  /**
   * Arrange, Listen, Read, Translate, Minify and Write LESS/SCSS/CSS or TS/JS input files to a unique output file.
   * 
   * LESS and TS not avaiable.
   * 
   * @param {String} output
   * @param {Array<String>} input
   * @param {Object=} options
   * @param {String} mode CSS or JS
   */
  async run(output, input, options, mode) {
    const self = this;
    // Sanitize falsy args
    output = output || [];
    input = input || [];
    options = options || {};
    // Execute
    console.log('Tasky > ' + mode + ' > Arrange...');
    self.arrange(output, input, options, self.dirname).then(function (arrangeResult) {
      console.log('Tasky > ' + mode + ' > Listen...');
      self.listen(arrangeResult, function (listenResult) {
        console.log('Tasky > ' + mode + ' > Read...');
        return self.read(listenResult).then(function (readResult) {
          console.log('Tasky > ' + mode + ' > Translate...');
          return self.translate(readResult).then(function (translateResult) {
            console.log('Tasky > ' + mode + ' > Minify...');
            return self.minify(translateResult).then(function (minifyResult) {
              console.log('Tasky > ' + mode + ' > Write...');
              self.write(minifyResult, function () {
                console.log('Tasky > ' + mode + ' > OK!');
              });
            })
          });
        });
      });
    });
  }

  /**
   * Arrange, Listen, Read, Translate, Minify and Write SCSS/CSS input files to a unique output file.
   * 
   * LESS not avaiable.
   * 
   * @param {String} output
   * @param {Array<String>} input
   * @param {Object=} options https://www.npmjs.com/package/node-sass#options
   */
  watchCSS(output, input, options) {
    this.dirname = path.dirname(callsite()[1].getFileName());
    this.run(output, input, options, 'CSS');
  }

  /**
   * Arrange, Listen, Read, Translate, Minify and Write JS input files to a unique output file.
   * 
   * TypeScript not avaiable.
   * 
   * @param {String} output
   * @param {Array<String>} input
   * @param {Object=} options https://www.npmjs.com/package/uglify-es#minify-options
   */
  watchJS(output, input, options) {
    this.dirname = path.dirname(callsite()[1].getFileName());
    this.run(output, input, options, 'JS');
  }

}

module.exports = new Tasky();
