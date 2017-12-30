const look = scure => (app) => {
  const roomId = app.data.roomId;
  const itemId = app.getArgument('arg');
  if (itemId) {
    app.ask(scure.getItem(itemId).description);
  } else {
    app.ask(scure.getRoom(roomId).description);
  }
};

exports.look = look;
