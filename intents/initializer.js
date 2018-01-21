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

const updateLanguage = (app, request) => {
  app.data.language = getLanguage(app, request);
  return app;
};

const hasSource = request => request && request.body && request.body.originalRequest && request.body.originalRequest.source;

const updatePlatform = (app, request) => {
  if (hasSource(request)) {
    app.data.platform = request.body.originalRequest.source;
  }
  return app;
};

const initialize = (scure, app, request) => {
  let newApp = app;
  newApp.data = app.data || {};
  newApp = initializeStartTime(newApp);
  newApp = initializeDefaultRoom(scure, newApp);
  newApp = increaseNumCommand(newApp);
  newApp = updateLanguage(newApp, request);
  newApp = updatePlatform(newApp, request);
  return newApp;
};

exports.initialize = initialize;
