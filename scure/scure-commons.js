const isEmptyArg = require('../lib/common').isEmptyArg;

const joinMultipleStrings = (arr) => {
  if (arr.length === 1) return arr[0];
  return `${arr.slice(0, arr.length - 1).join(', ')} y ${arr[arr.length - 1]}`;
};

const baseChars = str => str.replace(/[áäàÀÁÂÃÄÅ]/g, 'a')
  .replace(/[èéèÈÉÊË]/g, 'e')
  .replace(/[íìIÎ]/g, 'i')
  .replace(/[óòÓÔ]/g, 'o')
  .replace(/[úùüÙ]/g, 'u')
  .replace(/[çÇ]/g, 'c');

const isSynonym = (synonyms, name) => {
  const lcSyns = synonyms.map(it => baseChars(it.toLowerCase()));
  return lcSyns.indexOf(baseChars(name.toLowerCase())) >= 0;
};

const isTextEqual = (name1, name2) => {
  if (isEmptyArg(name1) || isEmptyArg(name2)) return false;
  return baseChars(name1.toLowerCase()) === baseChars(name2.toLowerCase());
};

const getPossibleDestinationsSentence = (scure, data) => {
  const destinations = scure.rooms.getPossibleDestinationNamesFrom(data.roomId, data.unlocked);
  return scure.sentences.get('destinations', { destinations });
};

const ifMatchCondition = (data, scure) => (descr) => {
  if (descr.condition.indexOf(':') === -1) return true;
  const [operator, itemId] = descr.condition.split(':', 2);
  const isNegated = operator.startsWith('!');
  if (operator === 'picked' || operator === '!picked') {
    const isPicked = scure.items.isPicked(itemId, data.picked);
    return (isNegated && !isPicked) || (!isNegated && isPicked);
  }
  return false;
};

const getMatchingDescription = (descriptions, data, scure) => {
  const matchedDescriptions = descriptions.filter(ifMatchCondition(data, scure));
  return matchedDescriptions.length > 0 ? matchedDescriptions[0] : null;
};

const getDescription = (descriptions, data, scure) => {
  if (typeof descriptions === 'string') return descriptions;
  const match = getMatchingDescription(descriptions, data, scure);
  return match ? match.description : descriptions[descriptions.length - 1].description;
};

const buildUsageIndex = (itemId1, itemId2) => {
  const itemsSorted = [itemId1, itemId2].sort();
  return itemsSorted.join('-');
};

exports.joinMultipleStrings = joinMultipleStrings;
exports.isSynonym = isSynonym;
exports.isTextEqual = isTextEqual;
exports.getPossibleDestinationsSentence = getPossibleDestinationsSentence;
exports.getDescription = getDescription;
exports.buildUsageIndex = buildUsageIndex;
