require('babel-register');
global.chai = require('chai');
global.sinon = require('sinon');

global.chai.should();

global.expect = global.chai.expect;

const actionsOnGoogle = require('actions-on-google');
const actionsOnGoogleMock = require('./actions-on-google-mock');

actionsOnGoogle.DialogflowApp = actionsOnGoogleMock.AogMock;

global.anAogRequestBuilder = actionsOnGoogleMock.anAogRequestBuilder;
global.getAogApp = actionsOnGoogleMock.getAogApp;
