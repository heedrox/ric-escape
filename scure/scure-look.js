const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;
const getPossibleDestinationsSentence = require('./scure-commons').getPossibleDestinationsSentence;
const getDescription = require('./scure-commons').getDescription;

const scureLook = (itemName, data, scure) => {
  const roomId = data.roomId;
  const item = scure.items.getItemByName(itemName);
  if (isEmptyArg(itemName)) {
    return aResponse(
      `${scure.rooms.getRoom(roomId).description} ${getPossibleDestinationsSentence(scure, data)}`
    );
  } else if (!item) {
    return aResponse(scure.sentences.get('item-not-in-location'));
  } else if (roomId !== item.location) {
    return aResponse(scure.sentences.get('item-not-in-location'));
  }
  return aResponse(getDescription(item.description, data, scure));
};

exports.scureLook = scureLook;
