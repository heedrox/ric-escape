/* eslint-disable strict,no-console */

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const DialogflowApp = require('actions-on-google').DialogflowApp;

const functions = require('firebase-functions');
const ricEscapeData = require('./ric-escape-data.js').data;
const buildScureFor = require('./scure/scure').buildScureFor;
const initialize = require('./intents/initializer').initialize;
const isTimeOver = require('./lib/common').isTimeOver;
const getLanguage = require('./lib/common').getLanguage;
const cleanData = require('./lib/common').cleanData;

const walk = require('./intents/walk').walk;
const look = require('./intents/look').look;
const pickup = require('./intents/pickup').pickup;
const use = require('./intents/use').use;
const inventory = require('./intents/inventory').inventory;
const help = require('./intents/others').help;
const fallback = require('./intents/others').fallback;
const welcome = require('./intents/others').welcome;
const language = require('./intents/language').language;
const bye = require('./intents/others').bye;

exports.ricEscape = functions.https.onRequest((request, response) => {
  const appInit = new DialogflowApp({ request, response });
  const scure = buildScureFor(ricEscapeData[getLanguage(appInit, request)]);
  const app = initialize(scure, appInit, request);

  // console.log(`Body: ${JSON.stringify(request.body)}`);
  // console.log(`Headers: ${JSON.stringify(request.headers)}`);
  console.log(`Intent: ${app.data.numCommands} / ${app.getIntent()} / ${getLanguage(app, request) === 'en' ? 'en' : 'es'} / Platform: ${app.data.platform} / `);

  if (isTimeOver(app.data)) {
    cleanData(app);
    app.tell(scure.sentences.get('end-timeover'));
    return;
  }

  if (app.data.numCommands < scure.getInit().welcome.length) {
    fallback(scure)(app);
    return;
  }
  const actionMap = new Map();
  actionMap.set('help', help(scure));
  actionMap.set('input.unknown', fallback(scure));
  actionMap.set('input.welcome', welcome(scure));
  actionMap.set('look', look(scure));
  actionMap.set('walk', walk(scure));
  actionMap.set('pickup', pickup(scure));
  actionMap.set('use', use(scure));
  actionMap.set('inventory', inventory(scure));
  actionMap.set('language', language(scure));
  actionMap.set('bye', bye(scure));
  actionMap.set('_exit._exit-yes', bye(scure));

  app.handleRequest(actionMap);
});
