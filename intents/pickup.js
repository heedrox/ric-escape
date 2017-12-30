const getArgument = require('../lib/common').getArgument;
const isEmptyArg = require('../lib/common').isEmptyArg;

const addToInventory = (app, itemId) => {
  const newApp = app;
  newApp.data.inventory = app.data.inventory || [];
  newApp.data.inventory.push(itemId);
  newApp.data.picked = app.data.picked || [];
  newApp.data.picked.push(itemId);
  return newApp;
};

const alreadyPicked = (app, itemId) => {
  if (!app.data) return false;
  if (!app.data.picked) return false;
  if (typeof app.data.picked.length !== 'number') return false;
  return app.data.picked.indexOf(itemId) >= 0;
};

const pickup = scure => (app) => {
  const roomId = app.data.roomId;
  const elementName = getArgument(app, 'arg');
  const itemName = getArgument(app, 'arg');
  const item = scure.items.getItemByName(itemName);
  if (isEmptyArg(elementName)) {
    app.ask(scure.sentences.get('item-unknown'));
  } else if (!item) {
    app.ask(scure.sentences.get('item-notseen', { name: itemName }));
  } else if (roomId !== item.location) {
    const name = item.name.toLowerCase();
    app.ask(scure.sentences.get('item-notseen', { name }));
  } else if (!item.pickable) {
    const name = item.name.toLowerCase();
    app.ask(scure.sentences.get('item-notpickable', { name }));
  } else if (alreadyPicked(app, item.id)) {
    const name = item.name.toLowerCase();
    app.ask(scure.sentences.get('item-alreadypicked', { name }));
  } else {
    const name = item.name.toLowerCase();
    app.ask(scure.sentences.get('item-pickedup', { name }));
    addToInventory(app, item.id);
  }
};

exports.pickup = pickup;
