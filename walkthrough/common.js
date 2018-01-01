const actionsOnGoogle = require('actions-on-google');
const actionsOnGoogleMock = require('../test/dialogflowapp-mock');

actionsOnGoogle.DialogflowApp = actionsOnGoogleMock.DialogflowAppMock;

global.aDfaRequestBuilder = actionsOnGoogleMock.aDfaRequestBuilder;
global.getDfaApp = actionsOnGoogleMock.getDfaApp;
