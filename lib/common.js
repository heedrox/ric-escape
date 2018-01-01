const TOTAL_MINS = 35;

const forceItemsToBeArray = (items) => {
  if (items && typeof items === 'object' && typeof items.length === 'number') return items;
  return [items];
};

exports.getArgument = (app, arg) => {
  const value = app.getArgument(arg);
  if (!value) return null;
  if (typeof value === 'object' && typeof value.length === 'number') return value[0];
  return value;
};

exports.getArgumentList = (app, arg) => forceItemsToBeArray(app.getArgument(arg));

exports.isEmptyArg = (arg) => {
  if (!arg) return true;
  if (typeof arg.length !== 'undefined' && arg.length === 0) return true;
  if (JSON.stringify(arg).trim() === '[]') return true;
  if (JSON.stringify(arg).trim() === '{}') return true;
  if (arg.trim && (arg.trim() === '')) return true;
  return false;
};

exports.overwriteDataFrom = (scureResponse, app) => {
  if (scureResponse.data) {
    app.data = scureResponse.data;
  }
};

exports.getLeftTimeFrom = (scure, app) => {
  const startTime = new Date(JSON.parse(app.data.startTime));
  const remainingTime = (TOTAL_MINS * 60) - ((new Date().getTime() - startTime.getTime()) / 1000);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);
  return scure.sentences.get('remaining-time', { minutes, seconds });
};

exports.isTimeOver = (data) => {
  const startTime = new Date(JSON.parse(data.startTime || JSON.stringify(new Date())));
  const currentTime = new Date();
  return (currentTime.getTime() - startTime.getTime()) > (TOTAL_MINS * 60 * 1000);
};
