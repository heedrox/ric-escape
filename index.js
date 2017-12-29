/* eslint-disable strict,no-console */

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;

const functions = require('firebase-functions');

const welcome = (app) => {
  app.ask('Hello!');
};

exports.ricEscape = functions.https.onRequest((request, response) => {
  const app = new App({ request, response });
  console.log(`Request headers: ${JSON.stringify(request.headers)}`);
  console.log(`Request body: ${JSON.stringify(request.body)}`);

  const actionMap = new Map();
  actionMap.set('welcome', welcome);

  app.handleRequest(actionMap);
});
