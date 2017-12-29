/* eslint-disable strict,no-console */

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;

const TOTAL_SECS = 30 * 60;
const functions = require('firebase-functions');
const ricEscapeData = require('./ric-escape-data.js').data;
const scure = require('./scure/scure').buildScureFor(ricEscapeData);

const initializeStartTime = (app) => {
  const newApp = app;
  newApp.data.startTime = newApp.data.startTime || new Date();
  return newApp;
};

const initializeDefaultRoom = (app) => {
  const newApp = app;
  newApp.data.roomId = app.data.roomId || scure.getInit().roomId;
  return newApp;
};

const initialize = (app) => {
  const app0 = app;
  app0.data = app.data || {};
  const app1 = initializeStartTime(app);
  const app2 = initializeDefaultRoom(app1);
  return app2;
};

const getLeftTimeFrom = (app) => {
  console.log(app.data.startTime);
  const remainingTime = TOTAL_SECS - ((new Date().getTime() - app.data.startTime.getTime()) / 1000);
  return `${Math.floor(remainingTime / 60)} minutos y ${Math.floor(remainingTime % 60)} segundos`;
};

const fallback = (app) => {
  const leftTime = getLeftTimeFrom(app);
  app.ask(`No te entiendo. Di Ayuda si necesitas ayuda. Nos quedan ${leftTime} para estrellarnos.`);
};

const look = (app) => {
  const roomId = app.data.roomId;
  // const arg = app.getArgument('arg');
  app.ask(scure.getRoom(roomId).description);
};

exports.ricEscape = functions.https.onRequest((request, response) => {
  const appInit = new App({ request, response });
  const app = initialize(appInit);

  console.log(`Request headers: ${JSON.stringify(request.headers)}`);
  console.log(`Request body: ${JSON.stringify(request.body)}`);
  console.log(`Intent: ${app.getIntent()}`);

  const actionMap = new Map();
  actionMap.set('look', look);
  actionMap.set('input.unknown', fallback);

  app.handleRequest(actionMap);
});
