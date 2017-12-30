const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;

const scureUse = (itemName, data, scure) => {
  const item = scure.items.getItemByName(itemName);
  if (isEmptyArg(itemName)) {
    return aResponse(scure.sentences.get('use-noarg'));
  }
  const usage = scure.usages.getByItemId(item.id);
  return aResponse(usage.response[0], data);
};

exports.scureUse = scureUse;
