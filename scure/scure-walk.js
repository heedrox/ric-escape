const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;

const getDestinationSentence = (scure, data) => {
  const destinations = scure.rooms.getDestinationNamesFrom(data.roomId);
  return scure.sentences.get('destinations', { destinations });
};

const scureWalk = (arg, data, scure) => {
  if (isEmptyArg(arg)) {
    return aResponse(getDestinationSentence(scure, data));
  }
  const newRoom = scure.rooms.getRoomByName(arg);
  const isAllowed = scure.rooms.isAllowedDestination(arg, data.roomId);
  if (!newRoom || !isAllowed) {
    const destinationsSentence = getDestinationSentence(scure, data);
    const unknownPlaceSentence = scure.sentences.get('destination-unknown', { destination: arg  });
    return aResponse(`${unknownPlaceSentence} ${destinationsSentence}`);
  }
  data.roomId = newRoom.id;
  return aResponse(newRoom.description, data);
};

exports.scureWalk = scureWalk;
