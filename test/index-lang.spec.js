const ricEscape = require('../index.js');

describe('Ric Escape - handles language', () => {
  it('gets sentences in english when locale english', () => {
    const request = aDfaRequestBuilder()
      .withIntent('walk')
      .withLocale('en-US')
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('From here I can go');
  });
});
