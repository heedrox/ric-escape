const ricEscape = require('./index.js');

describe('Ric Escape', () => {
  it('should exist', () => {
    ricEscape.ricEscape(anAogRequestBuilder().withIntent('welcome').build());

    expect(getAogApp().lastAsk).to.equal('Hello!');
  });
});
