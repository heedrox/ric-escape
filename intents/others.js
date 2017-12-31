const TOTAL_SECS = 30 * 60;

const getLeftTimeFrom = (scure, app) => {
  const startTime = new Date(JSON.parse(app.data.startTime));
  const remainingTime = TOTAL_SECS - ((new Date().getTime() - startTime.getTime()) / 1000);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);
  return scure.sentences.get('remaining-time', { minutes, seconds });
};

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


exports.help = help;
exports.fallback = fallback;
exports.welcome = welcome;
