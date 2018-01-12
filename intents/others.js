const getLeftTimeFrom = require('../lib/common').getLeftTimeFrom;
const RichResponse = require('actions-on-google').Responses.RichResponse;
const BasicCard = require('actions-on-google').Responses.BasicCard;
const cleanData = require('../lib/common').cleanData;

const MAP_URL_SPANISH = 'https://ric-escape.firebaseapp.com/ric-escape-map.jpg';
const MAP_URL_ENGLISH = 'https://ric-escape.firebaseapp.com/ric-escape-map-en.jpg';

const increaseNumFallbacks = (app) => {
  const getnextNumFallbacks = num => (!num ? 1 : (num + 1));
  const newApp = app;
  newApp.data.numFallbacks = getnextNumFallbacks(newApp.data.numFallbacks);
  return newApp;
};

const welcome = scure => (app) => {
  app.ask(scure.getInit().welcome[0]);
};

const help = scure => (app) => {
  const time = getLeftTimeFrom(scure, app);
  const helpText = scure.sentences.get('help', { time });
  const mapUrl = app.data.language === 'en' ? MAP_URL_ENGLISH : MAP_URL_SPANISH;
  const mapCard = new BasicCard().setImage(mapUrl, scure.sentences.get('map-alt'));
  const mapImage = new RichResponse().addSimpleResponse(helpText).addBasicCard(mapCard);
  app.ask(mapImage);
};

const fallback = scure => (app) => {
  if (app.getRawInput() === 'activateft') {
    app.data.testFT = true;
    app.ask('ok. ¿y ahora qué?');
    return;
  }
  app = increaseNumFallbacks(app);
  const welcomeSentence = scure.getInit().welcome[app.data.numFallbacks];
  if (typeof welcomeSentence === 'undefined') {
    const time = getLeftTimeFrom(scure, app);
    app.ask(scure.sentences.get('fallback', { time }));
  } else {
    app.ask(welcomeSentence);
  }
};

const bye = scure => (app) => {
  app = cleanData(app);
  app.data = null;
  app.tell(scure.sentences.get('bye'));
};

exports.help = help;
exports.fallback = fallback;
exports.welcome = welcome;
exports.bye = bye;
