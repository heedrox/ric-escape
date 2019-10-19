/* eslint-disable strict,no-console */
const functions = require('firebase-functions');
const { app } = require('scure-dialogflow');
const { data } = require('./app/data/ric-escape-data');
const { webhookGet, webhookPost } = require('./facebook/facebook');
const {
  dialogflow,
  actionssdk,
  Image,
  Table,
  Carousel,
} = require('actions-on-google');

const appData = app(data['es']);

const facebookBridge = (req, resp) => {
  if (req.method.toUpperCase() === 'GET') { webhookGet(req, resp); }
  if (req.method.toUpperCase() === 'POST') { webhookPost(req, resp); }
};

exports.facebookBridge = functions.https.onRequest(facebookBridge);
exports.ricEscape = functions.https.onRequest(appData);

