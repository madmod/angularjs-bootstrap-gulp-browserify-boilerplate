'use strict';
/*eslint-env node*/

module.exports = {
  // Parse Babel ES6 properly.
  parser: 'babel-eslint',
  globals: {
    require: true
  },
  rules: {
    strict: 0,
    indent: [
      2,
      2
    ],
    quotes: [
      2,
      'single'
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    semi: [
      2,
      'always'
    ]
  },
  env: {
    browser: true
  },
  extends: 'eslint:recommended'
};
