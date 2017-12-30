const getArgument = require('./common').getArgument;

const look = scure => (app) => {
  const roomId = app.data.roomId;
  const itemId = getArgument(app, 'arg');
  const item = scure.items.getItemByName(itemId);
  if (itemId && item) {
    app.ask(item.description);
  } else {
    app.ask(scure.rooms.getRoom(roomId).description);
  }
};

exports.look = look;
