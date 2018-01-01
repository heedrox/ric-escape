const getArgumentList = require('../lib/common').getArgumentList;
const scureUse = require('../scure/scure-use').scureUse;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;

const use = scure => (app) => {
  const items = getArgumentList(app, 'arg');

  const scureResponse = scureUse(items, app.data, scure);

  overwriteDataFrom(scureResponse, app);

  const finalSentence = scureResponse.sentence;
  if (finalSentence.isEndingScene) {
    app.tell(finalSentence.description);
  } else {
    app.ask(finalSentence);
  }
};

exports.use = use;
