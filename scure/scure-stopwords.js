const STOPWORDS = [
  'a',
  'about',
  'from',
  'his',
  'in',
  'is',
  'of',
  'on',
  'the',
  'that',
  'your',
  'de',
  'desde',
  'el',
  'en',
  'hacia',
  'la',
  'los',
  'las',
  'mi',
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
