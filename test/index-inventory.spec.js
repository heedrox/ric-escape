const ricEscape = require('../index.js');

describe('Ric Escape - inventory', () => {
  it('tells you your inventory', () => {
    const request = aDfaRequest()
      .withIntent('inventory')
      .withData({ inventory: ['comedor-cartera'] })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('Llevo los siguientes objetos');
    expect(getDfaApp().lastAsk).to.contains('Cartera');
  });

  it('tells you your inventory with multiple items', () => {
    const request = aDfaRequest()
      .withIntent('inventory')
      .withData({ inventory: ['comedor-cartera', 'hab108-cuadro'] })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('Llevo los siguientes objetos');
    expect(getDfaApp().lastAsk).to.contains('Cartera y Cuadro');
  });

  it('tells you your inventory with multiple items in English', () => {
    const request = aDfaRequest()
      .withIntent('inventory')
      .withData({ inventory: ['comedor-cartera', 'hab108-cuadro'] })
      .withLocale('en-US')
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('carrying these items');
    expect(getDfaApp().lastAsk).to.contains('Wallet and Picture');
  });


  it('tells you that has nothing', () => {
    const request = aDfaRequest()
      .withIntent('inventory')
      .withData({ })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('No llevo nada encima.');
  });
});
