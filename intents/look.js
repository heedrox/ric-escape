const getArgument = require('../lib/common').getArgument;
const isEmptyArg = require('../lib/common').isEmptyArg;

const look = scure => (app) => {
  const roomId = app.data.roomId;
  const itemId = getArgument(app, 'arg');
  const item = scure.items.getItemByName(itemId);
  if (isEmptyArg(itemId)) {
    app.ask(scure.rooms.getRoom(roomId).description);
  } else if (!item) {
    app.ask(scure.sentences.get('item-not-in-location'));
  } else if (roomId !== item.location) {
    app.ask(scure.sentences.get('item-not-in-location'));
  } else {
    app.ask(item.description);
  }
};

exports.look = look;
