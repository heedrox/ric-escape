/* eslint-disable quote-props */
const baseChars = require('../lib/common').baseChars;
const getArgument = require('../lib/common').getArgument;
const buildScureFor = require('../scure/scure').buildScureFor;
const ricEscapeData = require('../app/data/ric-escape-data').data;

const VALID_LANGUAGES = {
  'english': 'en',
  'ingles': 'en',
  'spanish': 'es',
  'espanol': 'es',
  'castellano': 'es',
};

const getLanguageBasedOnArg = (lang) => {
  if (!lang) return false;
  const baseLang = baseChars(lang);
  return VALID_LANGUAGES[baseLang];
};

const processChangeLanguage = (lang, app, scure) => {
  const locale = getLanguageBasedOnArg(lang);
  if (locale) {
    app.data.language = locale;
    app.data.dontChangeLanguage = 1;
    const newScure = buildScureFor(ricEscapeData[app.data.language]);
    app.ask(newScure.sentences.get('changed-language', { lang }));
  } else {
    app.ask(scure.sentences.get('changed-language-unknown', { lang }));
  }
  return true;
};

const language = scure => (app) => {
  const lang = getArgument(app, 'arg');
  processChangeLanguage(lang, app, scure);
};

const getLanguageFromInput = (input) => {
  const rawInput = baseChars(input);
  const langs = Object.keys(VALID_LANGUAGES);
  const words = rawInput.split(' ');
  const lang = words.find(w => langs.indexOf(w) >= 0);
  return lang;
};

const checkAndChangeLangageForInput = (scure, app) => {
  const lang = getLanguageFromInput(app.getRawInput());
  return lang ? processChangeLanguage(lang, app, scure) : false;
};

// exports.language = language;
exports.checkAndChangeLanguage = (scure, app) =>
  (app.getRawInput() ? checkAndChangeLangageForInput(scure, app) : false);

