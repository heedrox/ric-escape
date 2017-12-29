const ricEscape = require('./index.js');
const ricEscapeData = require('./ric-escape-data').data;
const scure = require('./scure/scure').buildScureFor(ricEscapeData);


describe('Ric Escape', () => {
  it('tells you the time when fallback', () => {
    const request = anAogRequestBuilder()
      .withIntent('input.unknown')
      .build();

    ricEscape.ricEscape(request);

    expect(getAogApp().lastAsk).to.contains('No te entiendo. Di Ayuda si');
    expect(getAogApp().lastAsk).to.contains('Nos quedan');
    expect(getAogApp().lastAsk).to.contains('minutos y');
    expect(getAogApp().lastAsk).to.contains('segundos para estrellarnos.');
  });

  it('looks the room when no argument given', () => {
    const request = anAogRequestBuilder()
      .withIntent('look')
      .withArgs({ arg: '' })
      .withData({ roomId: 'sala-mandos' })
      .build();

    ricEscape.ricEscape(request);

    expect(getAogApp().lastAsk).to.equal(scure.getRoom('sala-mandos').description);
  });
});
