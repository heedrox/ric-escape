const getArgument = require('../lib/common').getArgument;
const scureUse = require('../scure/scure-use').scureUse;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;

const use = scure => (app) => {
  const itemName = getArgument(app, 'arg');

  console.log(`before: ${JSON.stringify(app.data)}`);
  const scureResponse = scureUse(itemName, app.data, scure);

  console.log(`after: ${JSON.stringify(scureResponse.data)}`);
  overwriteDataFrom(scureResponse, app);
  app.ask(scureResponse.sentence);
};

exports.use = use;
