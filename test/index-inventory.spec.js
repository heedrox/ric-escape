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
});
