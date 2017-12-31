const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;
const getPossibleDestinationsSentence = require('./scure-commons').getPossibleDestinationsSentence;
const getDescription = require('./scure-commons').getDescription;

const getTheBestItem = (itemName, roomId, scure) => {
  const exactItemFromRoom = scure.items.getItemByNameAndRoom(itemName, roomId);
  if (exactItemFromRoom) return exactItemFromRoom;
  return scure.items.getItemByName(itemName);
};

const scureLook = (itemName, data, scure) => {
  const roomId = data.roomId;
  const item = getTheBestItem(itemName, roomId, scure);
  if (isEmptyArg(itemName)) {
    const room = scure.rooms.getRoom(roomId);
    return aResponse(
      `${getDescription(room.description, data, scure)} ${getPossibleDestinationsSentence(scure, data)}`
    );
  }
  if (!item) {
    return aResponse(scure.sentences.get('item-not-in-location'));
  }
  const isInInventory = scure.items.isInInventory(item.id, data.inventory);
  if (!isInInventory && roomId !== item.location) {
    return aResponse(scure.sentences.get('item-not-in-location'));
  }
  return aResponse(getDescription(item.description, data, scure));
};

exports.scureLook = scureLook;
