const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;

const getUsedTimes = (item, data) => (data.usages && data.usages[item.id]) || 0;

const scureUse = (itemName, data, scure) => {
  const item = scure.items.getItemByName(itemName);
  if (isEmptyArg(itemName)) {
    return aResponse(scure.sentences.get('use-noarg'));
  }
  if (!item) {
    return aResponse(scure.sentences.get('use-cant'));
  }
  const usage = scure.usages.getByItemId(item.id);
  if (!usage) {
    return aResponse(scure.sentences.get('use-cant'));
  }
  const itemUsedTimes = getUsedTimes(item, data);
  return aResponse(usage.response[itemUsedTimes], data);
};

exports.scureUse = scureUse;
