const getLeftTimeFrom = require('../lib/common').getLeftTimeFrom;
const RichResponse = require('actions-on-google').Responses.RichResponse;
const BasicCard = require('actions-on-google').Responses.BasicCard;
const cleanData = require('../lib/common').cleanData;

const MAP_URL_SPANISH = 'https://ric-escape.firebaseapp.com/ric-escape-map.jpg';
const MAP_URL_ENGLISH = 'https://ric-escape.firebaseapp.com/ric-escape-map-en.jpg';

const welcome = scure => (app) => {
  app.ask(scure.getInit().welcome[0]);
};

const helpWithMap = scure => (app) => {
  const time = getLeftTimeFrom(scure, app);
  const helpText = scure.sentences.get('help', { time });
  const mapUrl = app.data.language === 'en' ? MAP_URL_ENGLISH : MAP_URL_SPANISH;
  const mapCard = new BasicCard().setImage(mapUrl, scure.sentences.get('map-alt'));
  const mapImage = new RichResponse().addSimpleResponse(helpText).addBasicCard(mapCard);
  app.ask(mapImage);
};

const helpWithoutMap = scure => (app) => {
  const time = getLeftTimeFrom(scure, app);
  const helpText = scure.sentences.get('help-no-screen', { time });
  app.ask(helpText);
};

// eslint-disable-next-line no-confusing-arrow
const help = scure => app =>
  app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT) ?
    helpWithMap(scure)(app) :
    helpWithoutMap(scure)(app);

const fallback = scure => (app) => {
  if (app.getRawInput() === 'activateft') {
    app.data.testFT = true;
    app.ask('ok. ¿y ahora qué?');
    return;
  }
  if (app.data.numCommands < scure.getInit().welcome.length) {
    const welcomeSentence = scure.getInit().welcome[app.data.numCommands];
    app.ask(welcomeSentence);
    return;
  }
  const time = getLeftTimeFrom(scure, app);
  app.ask(scure.sentences.get('fallback', { time }));
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
