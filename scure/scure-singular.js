const singularize = require('pluralize').singular;

const shouldBeSingularized = word => word && word.length >= 4 && word.endsWith('s');
const toSingular = word => (shouldBeSingularized(word) ? singularize(word) : word);
const singularizeWords = text => text.split(' ').map(toSingular).join(' ');

exports.singularizeWords = singularizeWords;
