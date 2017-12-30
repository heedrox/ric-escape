const getArgument = require('./common').getArgument;

const getDestinationSentence = (scure, app) => {
  const destinations = scure.rooms.getDestinationNamesFrom(app.data.roomId);
  return scure.sentences.get('destinations', { destinations });
};

const changeRoom = (app, roomId) => {
  const newApp = app;
  newApp.data.roomId = roomId;
  return newApp;
};

const walk = scure => (app) => {
  const arg = getArgument(app, 'arg');
  if (!arg) {
    app.ask(getDestinationSentence(scure, app));
    return;
  }
  const newRoom = scure.rooms.getRoomByName(arg);
  const isAllowed = scure.rooms.isAllowedDestination(arg, app.data.roomId);
  if (!newRoom || !isAllowed) {
    const destinationsSentence = getDestinationSentence(scure, app);
    const unknownPlaceSentence = scure.sentences.get('destination-unknown', { destination: arg  });
    app.ask(`${unknownPlaceSentence} ${destinationsSentence}`);
    return;
  }
  changeRoom(app, newRoom.id);
  app.ask(newRoom.description);
};

exports.walk = walk;
