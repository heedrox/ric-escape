const STOPWORDS = [
  'a',
  'about',
  'for',
  'from',
  'his',
  'in',
  'is',
  'of',
  'on',
  'the',
  'that',
  'through',
  'your',
  'de',
  'desde',
  'el',
  'en',
  'entre',
  'hacia',
  'la',
  'los',
  'las',
  'mi',
  'para',
  'por',
  'que',
  'sobre',
  'su',
  'tu',
  'un',
  'una',
];

const byNotStopword = word => STOPWORDS.indexOf(word) === -1;
const isStopword = word => STOPWORDS.indexOf(word) > -1;
const removeStopwords = str => (isStopword(str) ? str : str.split(' ').filter(byNotStopword).join(' '));

exports.removeStopwords = removeStopwords;
