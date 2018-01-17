const ricEscape = require('../index.js');

describe('when fallback', () => {
  it('gives you introduction the first time in any intent', () => {
    const request = aDfaRequestBuilder()
      .withIntent('use')
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('¿Oh, Estás despierto?');
    expect(getDfaApp().data.numCommands).to.equal(1);
  });

  it('gives you another introduction the second time', () => {
    const request = aDfaRequestBuilder()
      .withIntent('use')
      .withData({ numCommands: 1 })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('Tras el proceso');
    expect(getDfaApp().data.numCommands).to.equal(2);
  });

  it('tells you the time ', () => {
    const request = aDfaRequestBuilder()
      .withIntent('input.unknown')
      .withData({ numCommands: 2 })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('No te entiendo. Di Ayuda si');
    expect(getDfaApp().lastAsk).to.contains('Nos quedan');
    expect(getDfaApp().lastAsk).to.contains('minutos y');
    expect(getDfaApp().lastAsk).to.contains('segundos para estrellarnos.');
  });
});
