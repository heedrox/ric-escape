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

const initialize = (scure, app) => {
  const app0 = app;
  app0.data = app.data || {};
  const app1 = initializeStartTime(app0);
  const app2 = initializeDefaultRoom(scure, app1);
  const app3 = increaseNumCommand(app2);
  const app4 = updateLanguage(app3);
  return app4;
};

exports.initialize = initialize;