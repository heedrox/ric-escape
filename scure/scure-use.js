const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;

const getUsedTimes = (item, usages) =>
  (usages && usages[item.id]) || 0;
const currentResponse = (item, usage, usages) =>
  usage.response[getUsedTimes(item, usages) % usage.response.length];
const getSentence = response =>
  (response.isUnlockingAction || response.isPickingAction ? response.response : response);
const unlockIfUnlockingAction = (response, data) => {
  if (response.isUnlockingAction) {
    data.unlocked = data.unlocked || [];
    if (data.unlocked.indexOf(response.lock) === -1) {
      data.unlocked.push(response.lock);
    }
  }
  return data;
};

const addItemIdTo = (itemId, data, container) => {
  data[container] = data[container] || [];
  if (data[container].indexOf(itemId) === -1) {
    data[container].push(itemId);
  }
};

const pickIfPickingAction = (response, data) => {
  if (response.isPickingAction) {
    addItemIdTo(response.itemId, data, 'picked');
    addItemIdTo(response.itemId, data, 'inventory');
  }
  return data;
};
const disposeIfItemInInventory = (isInInventory, itemId, data) => {
  const newData = data;
  if (isInInventory) {
    newData.inventory.splice(newData.inventory.indexOf(itemId), 1);
  }
  return newData;
};

const increaseUsage = (item, data) => {
  if (JSON.stringify(data.usages) === '[]') data.usages = {};
  if (typeof data.usages !== 'object') data.usages = {};
  if (!data.usages) data.usages = {};
  data.usages[item.id] = (data.usages[item.id] + 1) || 1;
  return data;
};

const markAsPickedIfPickableObjectButUsed = (item, data) => {
  const newData = data;
  if (item.pickable) {
    addItemIdTo(item.id, data, 'picked');
  }
  return newData;
};

const scureUse = (itemName, data, scure) => {
  if (isEmptyArg(itemName)) {
    return aResponse(scure.sentences.get('use-noarg'));
  }
  const item = scure.items.getItemByName(itemName);
  if (!item) {
    return aResponse(scure.sentences.get('use-cant'));
  }
  const isInInventory = scure.items.isInInventory(item.id, data.inventory);
  const inLocation = item.location === data.roomId;
  if (!isInInventory && !inLocation) {
    return aResponse(scure.sentences.get('use-cant'));
  }
  const usage = scure.usages.getByItemId(item.id);
  if (!usage) {
    return aResponse(scure.sentences.get('use-cant'));
  }
  const response = currentResponse(item, usage, data.usages);
  data = unlockIfUnlockingAction(response, data);
  data = pickIfPickingAction(response, data);
  data = markAsPickedIfPickableObjectButUsed(item, data);
  data = disposeIfItemInInventory(isInInventory, item.id, data);
  data = increaseUsage(item, data);
  return aResponse(getSentence(response), data);
};

exports.scureUse = scureUse;
