const getArgument = require('../lib/common').getArgument;
const scureUse = require('../scure/scure-use').scureUse;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;

const use = scure => (app) => {
  const itemName = getArgument(app, 'arg');

  const scureResponse = scureUse(itemName, app.data, scure);

  console.log(scureResponse.data);
  overwriteDataFrom(scureResponse, app);
  console.log(app.data);
  app.ask(scureResponse.sentence);
};

exports.use = use;
