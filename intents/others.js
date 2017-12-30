const TOTAL_SECS = 30 * 60;

const getLeftTimeFrom = (scure, app) => {
  const startTime = new Date(JSON.parse(app.data.startTime));
  const remainingTime = TOTAL_SECS - ((new Date().getTime() - startTime.getTime()) / 1000);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);
  return scure.sentences.get('remaining-time', { minutes, seconds });
};

const help = scure => (app) => {
  const time = getLeftTimeFrom(scure, app);
  app.ask(scure.sentences.get('help', { time }));
};

const fallback = scure => (app) => {
  const time = getLeftTimeFrom(scure, app);
  app.ask(scure.sentences.get('fallback', { time }));
};


exports.help = help;
exports.fallback = fallback;
