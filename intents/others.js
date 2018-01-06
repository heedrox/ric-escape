const getLeftTimeFrom = require('../lib/common').getLeftTimeFrom;
const RichResponse = require('actions-on-google').Responses.RichResponse;
const BasicCard = require('actions-on-google').Responses.BasicCard;

const MAP_URL = 'https://ric-escape.firebaseapp.com/ric-escape-map.jpg';

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
  const mapCard = new BasicCard().setImage(MAP_URL, 'Un mapa de las habitaciones de la nave');
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
  app.tell(scure.sentences.get('bye'));
};

exports.help = help;
exports.fallback = fallback;
exports.welcome = welcome;
exports.bye = bye;