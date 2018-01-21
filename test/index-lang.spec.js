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
});
