const aResponse = require('./scure-response').aResponse;
const joinMultipleStrings = require('./scure-commons').joinMultipleStrings;

const scureInventory = (data, scure) => {
  const itemIds = data.inventory.slice();
  const itemNames = itemIds.map(id => scure.items.getItem(id).name);
  const items = joinMultipleStrings(itemNames);
  const inventoryExplain = scure.sentences.get('inventory', { items });
  return aResponse(inventoryExplain);
};

exports.scureInventory = scureInventory;
