require('babel-register');
const actionsOnGoogle = require('actions-on-google');
const actionsOnGoogleMock = require('./dialogflowapp-mock');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

global.chai = require('chai');
global.sinon = require('sinon');


global.chai.should();

global.expect = global.chai.expect;


actionsOnGoogle.DialogflowApp = actionsOnGoogleMock.DialogflowAppMock;

admin.initializeApp = () => { };
functions.config = () => ({ firebase: {} });

global.aDfaRequest = actionsOnGoogleMock.aDfaRequest;
global.getDfaApp = actionsOnGoogleMock.getDfaApp;
