/* eslint-disable strict,no-console */

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;

const functions = require('firebase-functions');
const ricEscapeData = require('./ric-escape-data.js').data;
const scure = require('./scure/scure').buildScureFor(ricEscapeData);
const initialize = require('./intents/initializer').initialize;
const isTimeOver = require('./lib/common').isTimeOver;

const walk = require('./intents/walk').walk(scure);
const look = require('./intents/look').look(scure);
const pickup = require('./intents/pickup').pickup(scure);
const use = require('./intents/use').use(scure);
const inventory = require('./intents/inventory').inventory(scure);
const help = require('./intents/others').help(scure);
const fallback = require('./intents/others').fallback(scure);
const welcome = require('./intents/others').welcome(scure);
const bye = require('./intents/others').bye(scure);

exports.ricEscape = functions.https.onRequest((request, response) => {
  const appInit = new App({ request, response });
  const app = initialize(scure, appInit);

  console.log(`Request headers: ${JSON.stringify(request.headers)}`);
  console.log(`Request body: ${JSON.stringify(request.body)}`);
  console.log(`Intent: ${app.getIntent()}`);

  if (isTimeOver(app.data)) {
    app.tell(scure.sentences.get('end-timeover'));
    return;
  }

  const actionMap = new Map();
  actionMap.set('help', help);
  actionMap.set('input.unknown', fallback);
  actionMap.set('input.welcome', welcome);
  actionMap.set('look', look);
  actionMap.set('walk', walk);
  actionMap.set('pickup', pickup);
  actionMap.set('use', use);
  actionMap.set('inventory', inventory);
  actionMap.set('bye', bye);

  app.handleRequest(actionMap);
});
