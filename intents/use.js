const getArgumentList = require('../lib/common').getArgumentList;
const getLeftTimeFrom = require('../lib/common').getLeftTimeFrom;
const scureUse = require('../scure/scure-use').scureUse;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;

const use = scure => (app) => {
  const items = getArgumentList(app, 'arg');

  const scureResponse = scureUse(items, app.data, scure);

  overwriteDataFrom(scureResponse, app);

  const finalSentence = scureResponse.sentence;
  if (finalSentence.isEndingScene) {
    const finalWords = `${finalSentence.description} Quedaban ${getLeftTimeFrom(scure, app)}`;
    app.tell(finalWords);
  } else {
    app.ask(finalSentence);
  }
};

exports.use = use;
