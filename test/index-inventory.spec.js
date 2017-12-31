const ricEscape = require('../index.js');

describe('Ric Escape - inventory', () => {
  it('tells you your inventory', () => {
    const request = aDfaRequestBuilder()
      .withIntent('inventory')
      .withData({ inventory: ['comedor-cartera'] })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('Llevo los siguientes objetos');
    expect(getDfaApp().lastAsk).to.contains('Cartera');
  });

  it('tells you that has nothing', () => {
    const request = aDfaRequestBuilder()
      .withIntent('inventory')
      .withData({ })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('No llevo nada encima.');
  });
});
