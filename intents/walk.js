const getArgument = require('../lib/common').getArgument;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;
const scureWalk = require('../scure/scure-walk').scureWalk;

const walk = scure => (app) => {
  const arg = getArgument(app, 'arg');

  const scureResponse = scureWalk(arg, app.data, scure);

  overwriteDataFrom(scureResponse, app);
  app.ask(scureResponse.sentence);
};

exports.walk = walk;
