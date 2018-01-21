const actionsOnGoogle = require('actions-on-google');
const actionsOnGoogleMock = require('../test/dialogflowapp-mock');

actionsOnGoogle.DialogflowApp = actionsOnGoogleMock.DialogflowAppMock;

global.aDfaRequest = actionsOnGoogleMock.aDfaRequest;
global.getDfaApp = actionsOnGoogleMock.getDfaApp;
