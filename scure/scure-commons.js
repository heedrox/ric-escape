const isEmptyArg = require('../lib/common').isEmptyArg;

const joinMultipleStrings = (arr) => {
  if (arr.length === 1) return arr[0];
  return `${arr.slice(0, arr.length - 1).join(', ')} y ${arr[arr.length - 1]}`;
};

const isSynonym = (synonyms, name) => {
  const lcSyns = synonyms.map(it => it.toLowerCase());
  return lcSyns.indexOf(name.toLowerCase()) >= 0;
};

const isTextEqual = (name1, name2) => {
  if (isEmptyArg(name1) || isEmptyArg(name2)) return false;
  return name1.toLowerCase() === name2.toLowerCase();
};

const getPossibleDestinationsSentence = (scure, data) => {
  const destinations = scure.rooms.getPossibleDestinationNamesFrom(data.roomId, data.unlocked);
  return scure.sentences.get('destinations', { destinations });
};


exports.joinMultipleStrings = joinMultipleStrings;
exports.isSynonym = isSynonym;
exports.isTextEqual = isTextEqual;
exports.getPossibleDestinationsSentence = getPossibleDestinationsSentence;
