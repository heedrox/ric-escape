const getArgument = require('../lib/common').getArgument;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;

const scurePickup = require('../scure/scure-pickup').scurePickup;

const pickup = scure => (app) => {
  const itemName = getArgument(app, 'arg');

  const scureResponse = scurePickup(itemName, app.data, scure);

  overwriteDataFrom(scureResponse, app);
  app.ask(scureResponse.sentence);
};

exports.pickup = pickup;
