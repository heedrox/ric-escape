const ricEscape = require('./index.js');

describe('Ric Escape', () => {
  it('should say hello', () => {
    ricEscape.ricEscape(anAogRequestBuilder().withIntent('welcome').build());

    expect(getAogApp().lastAsk).to.equal('Hello!');
  });
});
