require('babel-register');
global.chai = require('chai');
global.sinon = require('sinon');

global.chai.should();

global.expect = global.chai.expect;

const actionsOnGoogle = require('actions-on-google');
const actionsOnGoogleMock = require('./dialogflowapp-mock');

actionsOnGoogle.DialogflowApp = actionsOnGoogleMock.DialogflowAppMock;

global.aDfaRequest = actionsOnGoogleMock.aDfaRequest;
global.getDfaApp = actionsOnGoogleMock.getDfaApp;
