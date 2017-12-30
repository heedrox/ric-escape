const ricEscape = require('../index.js');

describe('Ric Escape - others', () => {
  it('tells you the time when help', () => {
    const request = aDfaRequestBuilder()
      .withIntent('help')
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('El único que puede ayudarte soy yo, RIC. Me puedes dar las siguientes instrucciones: Mirar, Usar, Ir, Coger e Inventario.');
    expect(getDfaApp().lastAsk).to.contains('Nos quedan');
    expect(getDfaApp().lastAsk).to.contains('minutos y');
    expect(getDfaApp().lastAsk).to.contains('segundos para estrellarnos.');
  });

  it('tells you the time when fallback', () => {
    const request = aDfaRequestBuilder()
      .withIntent('input.unknown')
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('No te entiendo. Di Ayuda si');
    expect(getDfaApp().lastAsk).to.contains('Nos quedan');
    expect(getDfaApp().lastAsk).to.contains('minutos y');
    expect(getDfaApp().lastAsk).to.contains('segundos para estrellarnos.');
  });
});
