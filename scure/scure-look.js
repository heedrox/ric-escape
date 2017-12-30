const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;

const scureLook = (itemName, data, scure) => {
  const roomId = data.roomId;
  const item = scure.items.getItemByName(itemName);
  if (isEmptyArg(itemName)) {
    return aResponse(scure.rooms.getRoom(roomId).description);
  } else if (!item) {
    return aResponse(scure.sentences.get('item-not-in-location'));
  } else if (roomId !== item.location) {
    return aResponse(scure.sentences.get('item-not-in-location'));
  }
  return aResponse(item.description);
};

exports.scureLook = scureLook;
