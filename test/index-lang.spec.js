const ricEscape = require('../index.js');

describe('Ric Escape - handles language', () => {
  it('gets sentences in english when locale english', () => {
    const request = aDfaRequest()
      .withIntent('walk')
      .withLocale('en-US')
      .withData({ numCommands: 10 })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('From here I can go');
  });

  it('can change language', () => {
    const request = aDfaRequest()
      .withIntent('language')
      .withArgs({ arg: 'english' })
      .withData({ numCommands: 10, lastIntro: 1 })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().data.language).to.equal('en');
    expect(getDfaApp().data.dontChangeLanguage).to.equal(1);
    expect(getDfaApp().lastAsk).to.contains('I will speak in english');
  });

  it('says cannot change language when language unknown', () => {
    const request = aDfaRequest()
      .withIntent('language')
      .withArgs({ arg: 'notknownlang' })
      .withData({ numCommands: 10, lastIntro: 1 })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().data.language).to.equal('es');
    expect(getDfaApp().lastAsk).to.contains('No sé hablar el idioma notknownlang. Solo sé hablar inglés y español.');
  });

  it('does not change language if already set', () => {
    const request = aDfaRequest()
      .withIntent('look')
      .withArgs({ arg: null })
      .withLocale('es')
      .withData({ language: 'en', numCommands: 10, dontChangeLanguage: 1, roomId: 'sala-mandos' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().data.language).to.equal('en');
    expect(getDfaApp().lastAsk).to.contains('I am at the control');
  });
});
