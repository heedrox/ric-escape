const getLeftTimeFrom = require('../lib/common').getLeftTimeFrom;

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
  app.ask(scure.sentences.get('help', { time }));
};

const fallback = scure => (app) => {
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