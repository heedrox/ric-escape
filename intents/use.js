const getArgument = require('../lib/common').getArgument;
const isEmptyArg = require('../lib/common').isEmptyArg;

const use = scure => (app) => {
  // const roomId = app.data.roomId;
  const itemName = getArgument(app, 'arg');
  const item = scure.items.getItemByName(itemName);
  if (isEmptyArg(itemName)) {
    app.ask(scure.sentences.get('use-noarg'));
    return;
  }
  const usage = scure.usages.getByItemId(item.id);
  app.ask(usage.response[0]);
};

exports.use = use;
