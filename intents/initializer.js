const getLanguage = require('../lib/common').getLanguage;

const initializeStartTime = (app) => {
  const newApp = app;
  newApp.data.startTime = newApp.data.startTime || JSON.stringify(new Date());
  return newApp;
};

const initializeDefaultRoom = (scure, app) => {
  const newApp = app;
  newApp.data.roomId = app.data.roomId || scure.getInit().roomId;
  return newApp;
};

const increaseNumCommand = (app) => {
  const getNextNumCommand = num => (!num ? 1 : (num + 1));
  const newApp = app;
  newApp.data.numCommands = getNextNumCommand(newApp.data.numCommands);
  return newApp;
};

const updateLanguage = (app) => {
  app.data.language = getLanguage(app);
  return app;
};

const isWelcomeRequest = request => request && request.body && request.body.result
  && request.body.result.resolvedQuery && (request.body.result.resolvedQuery.indexOf('_WELCOME') > 0);

const substringBefore = (str, needle) => str.substring(0, str.indexOf(needle));

const updatePlatform = (app, request) => {
  if (isWelcomeRequest(request)) {
    app.data.platform = substringBefore(request.body.result.resolvedQuery, '_WELCOME');
  }
  return app;
};

const initialize = (scure, app, request) => {
  let newApp = app;
  newApp.data = app.data || {};
  newApp = initializeStartTime(newApp);
  newApp = initializeDefaultRoom(scure, newApp);
  newApp = increaseNumCommand(newApp);
  newApp = updateLanguage(newApp);
  newApp = updatePlatform(newApp, request);
  return newApp;
};

exports.initialize = initialize;
