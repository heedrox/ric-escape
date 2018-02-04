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


const decodeLanguage = (locale) => {
  if (locale.substr(0, 2) === 'en') return 'en';
  return 'es';
};

const guessLanguage = (request) => {
  if (request && request.body && request.body.originalRequest && request.body.originalRequest.data
  && request.body.originalRequest.data.message && request.body.originalRequest.data.message.from
  && request.body.originalRequest.data.message.from['language_code']) {
    return decodeLanguage(request.body.originalRequest.data.message.from['language_code']);
  }
  if (request && request.body && request.body.lang) {
    return decodeLanguage(request.body.lang);
  }
  return 'es';
};

exports.getLanguage = (app, request) => {
  if (app.data && (app.data.dontChangeLanguage === 1) && (typeof app.data.language !== 'undefined')) return app.data.language;
  if (!app.getUserLocale()) return guessLanguage(request);
  return decodeLanguage(app.getUserLocale());
};


exports.cleanData = (app) => {
  app.data.numCommands = 0;
  app.data.roomId = null;
  app.data.startTime = null;
  app.data.inventory = [];
  app.data.picked = [];
  return app;
};

exports.baseChars = str => str.toLowerCase().replace(/[áäàÀÁÂÃÄÅ]/g, 'a')
  .replace(/[èéèÈÉÊË]/g, 'e')
  .replace(/[íìIÎ]/g, 'i')
  .replace(/[óòÓÔ]/g, 'o')
  .replace(/[úùüÙ]/g, 'u')
  .replace(/[çÇ]/g, 'c')
  .replace(/[ñÑ]/g, 'n')
  .replace(/[-\\?]/g, '');
