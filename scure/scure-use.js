const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;

const getUsedTimes = (item, usages) =>
  (usages && usages[item.id]) || 0;
const currentResponse = (item, usage, usages) =>
  usage.response[getUsedTimes(item, usages) % usage.response.length];
const getSentence = response =>
  (response.isUnlockableAction ? response.response : response);
const unlockIfUnlockableAction = (response, data) => {
  if (response.isUnlockableAction) {
    data.unlocked = data.unlocked || [];
    if (data.unlocked.indexOf(response.lock) === -1) {
      data.unlocked.push(response.lock);
    }
  }
};

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
  const response = currentResponse(item, usage, data.usages);
  unlockIfUnlockableAction(response, data);
  return aResponse(getSentence(response), data);
};

exports.scureUse = scureUse;
