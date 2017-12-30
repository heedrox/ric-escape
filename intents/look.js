const getArgument = require('../lib/common').getArgument;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;
const scureLook = require('../scure/scure-look').scureLook;

const look = scure => (app) => {
  const itemName = getArgument(app, 'arg');

  const scureResponse = scureLook(itemName, app.data, scure);

  overwriteDataFrom(scureResponse, app);
  app.ask(scureResponse.sentence);
};

exports.look = look;
