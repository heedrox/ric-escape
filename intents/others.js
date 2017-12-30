const TOTAL_SECS = 30 * 60;

const getLeftTimeFrom = (app) => {
  console.log(app.data.startTime);
  const startTime = new Date(JSON.parse(app.data.startTime));
  const remainingTime = TOTAL_SECS - ((new Date().getTime() - startTime.getTime()) / 1000);
  return `${Math.floor(remainingTime / 60)} minutos y ${Math.floor(remainingTime % 60)} segundos`;
};

const help = scure => (app) => {
  const time = getLeftTimeFrom(app);
  app.ask(scure.sentences.get('help', { time }));
};

const fallback = scure => (app) => {
  const time = getLeftTimeFrom(app);
  app.ask(scure.sentences.get('fallback', { time }));
};


exports.help = help;
exports.fallback = fallback;
