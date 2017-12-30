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

const initialize = (scure, app) => {
  const app0 = app;
  app0.data = app.data || {};
  const app1 = initializeStartTime(app);
  const app2 = initializeDefaultRoom(scure, app1);
  return app2;
};

exports.initialize = initialize;