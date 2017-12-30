const look = scure => (app) => {
  const roomId = app.data.roomId;
  const itemId = app.getArgument('arg');
  const item = scure.items.getItem(itemId);
  if (itemId && item) {
    app.ask(item.description);
  } else {
    app.ask(scure.getRoom(roomId).description);
  }
};

exports.look = look;
