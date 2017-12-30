/* eslint-disable strict,no-console */

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;

const functions = require('firebase-functions');
const ricEscapeData = require('./ric-escape-data.js').data;
const scure = require('./scure/scure').buildScureFor(ricEscapeData);
const initialize = require('./intents/initializer').initialize;

const walk = require('./intents/walk').walk(scure);
const look = require('./intents/look').look(scure);
const pickup = require('./intents/pickup').pickup(scure);
const use = require('./intents/use').use(scure);
const help = require('./intents/others').help(scure);
const fallback = require('./intents/others').fallback(scure);

exports.ricEscape = functions.https.onRequest((request, response) => {
  const appInit = new App({ request, response });
  const app = initialize(scure, appInit);

  console.log(`Request headers: ${JSON.stringify(request.headers)}`);
  console.log(`Request body: ${JSON.stringify(request.body)}`);
  console.log(`Intent: ${app.getIntent()}`);

  const actionMap = new Map();
  actionMap.set('help', help);
  actionMap.set('input.unknown', fallback);
  actionMap.set('look', look);
  actionMap.set('walk', walk);
  actionMap.set('pickup', pickup);
  actionMap.set('use', use);

  app.handleRequest(actionMap);
});
