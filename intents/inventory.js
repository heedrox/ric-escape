const scureInventory = require('../scure/scure-inventory').scureInventory;

const inventory = scure => (app) => {
  const scureResponse = scureInventory(app.data, scure);

  app.ask(scureResponse.sentence);
};

exports.inventory = inventory;
