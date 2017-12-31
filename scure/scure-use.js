const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;

const getUsedTimes = (item, data) => (data.usages && data.usages[item.id]) || 0;
const getProperSentence = (item, usage, data) =>
  usage.response[getUsedTimes(item, data) % usage.response.length];

const scureUse = (itemName, data, scure) => {
  if (isEmptyArg(itemName)) {
    return aResponse(scure.sentences.get('use-noarg'));
  }
  const item = scure.items.getItemByName(itemName);
  if (!item) {
    return aResponse(scure.sentences.get('use-cant'));
  }
  const usage = scure.usages.getByItemId(item.id);
  if (!usage) {
    return aResponse(scure.sentences.get('use-cant'));
  }
  return aResponse(getProperSentence(item, usage, data), data);
};

exports.scureUse = scureUse;
