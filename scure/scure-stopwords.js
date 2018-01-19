const STOPWORDS = [
  'a',
  'about',
  'at',
  'for',
  'from',
  'fucking',
  'his',
  'in',
  'is',
  'of',
  'on',
  'the',
  'that',
  'through',
  'your',
  'al',
  'de',
  'desde',
  'el',
  'en',
  'entre',
  'hacia',
  'la',
  'los',
  'las',
  'maldita',
  'mi',
  'para',
  'por',
  'puta',
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
