const ricEscape = require('../index.js');

describe('Ric Escape - feature toggles. When FT mode activated', () => {
  it('activates FT in unknown intent with command activate feature toggles', () => {
    const request = aDfaRequestBuilder()
      .withIntent('input.unknown')
      .withRawInput('activateft')
      .withData({})
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().data.testFT).to.equal(true);
  });
  xit('shows helpTest instead of help', () => {
    const request = aDfaRequestBuilder()
      .withIntent('help')
      .withData({ testFT: true })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk.constructor.name).to.equal('RichResponse');
  });
});
