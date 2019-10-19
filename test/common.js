require('babel-register');

const { buildScureFor } = require('scure').scure;
const testData = require('./data/data-test').data;
global.chai = require('chai');
global.sinon = require('sinon');

global.chai.should();
global.expect = global.chai.expect;
global.buildTestScure = () => buildScureFor(testData);
