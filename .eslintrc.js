module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'airbnb',
  // required to lint *.vue files
  plugins: [
    'html',
    'chai-friendly'
  ],
  // add your custom rules here
  rules: {
    'func-names': ['error', 'never'],
    'no-unused-expressions': 0,
    'no-param-reassign': 0,
    'chai-friendly/no-unused-expressions': 2,
    strict: 0,
    'dot-notation': 0,
  },
  'env': {
    'mocha': true
  },
  'globals': {
    'expect': true,
    'sinon': true,
    'window': true,
    'getDfaApp': true,
    "aDfaRequest": true,
  }
};
