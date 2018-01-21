/* eslint-disable quote-props */
const baseChars = require('../lib/common').baseChars;
const getArgument = require('../lib/common').getArgument;
const buildScureFor = require('../scure/scure').buildScureFor;
const ricEscapeData = require('../ric-escape-data').data;

const VALID_LANGUAGES = {
  'english': 'en',
  'ingles': 'en',
  'inglés': 'en',
  'spanish': 'es',
  'espanol': 'es',
  'castellano': 'es',
  'español': 'es',
};

const getLanguageBasedOnArg = (lang) => {
  if (!lang) return false;
  const baseLang = baseChars(lang);
  return VALID_LANGUAGES[baseLang];
};

const language = scure => (app) => {
  const lang = getArgument(app, 'arg');
  const locale = getLanguageBasedOnArg(lang);
  if (locale) {
    app.data.language = locale;
    app.data.dontChangeLanguage = 1;
    const newScure = buildScureFor(ricEscapeData[app.data.language]);
    app.ask(newScure.sentences.get('changed-language', { lang }));
  } else {
    app.ask(scure.sentences.get('changed-language-unknown', { lang }));
  }
};

exports.language = language;
