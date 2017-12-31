const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;

const getPossibleDestinationsSentence = (scure, data) => {
  const destinations = scure.rooms.getPossibleDestinationNamesFrom(data.roomId, data.unlocked);
  return scure.sentences.get('destinations', { destinations });
};

const scureWalk = (arg, data, scure) => {
  if (isEmptyArg(arg)) {
    return aResponse(getPossibleDestinationsSentence(scure, data));
  }
  const newRoom = scure.rooms.getRoomByName(arg);
  const isAllowed = scure.rooms.isAllowedDestination(arg, data.roomId, data.unlocked);
  if (!newRoom || !isAllowed) {
    const destinationsSentence = getPossibleDestinationsSentence(scure, data);
    const unknownPlaceSentence = scure.sentences.get('destination-unknown', { destination: arg  });
    return aResponse(`${unknownPlaceSentence} ${destinationsSentence}`);
  }
  data.roomId = newRoom.id;
  return aResponse(newRoom.description, data);
};

exports.scureWalk = scureWalk;
