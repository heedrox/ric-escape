const ricEscape = require('../index.js');
const ricEscapeData = require('../ric-escape-data').data['es'];
const scure = require('../scure/scure').buildScureFor(ricEscapeData);


describe('Ric Escape - when looking up', () => {
  const EMPTY_ARGS = [null, undefined, '', ' ', 'habitación', 'lugar', [], {}];

  EMPTY_ARGS.forEach((arg) => {
    it(`looks the room and shows destinations when no argument given or 'habitacion' or 'lugar' is said (arg: ${arg})`, () => {
      const request = aDfaRequest()
        .withIntent('look')
        .withArgs({ arg })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().lastAsk).to.contains(scure.rooms.getRoom('sala-mandos').description);
      expect(getDfaApp().lastAsk).to.contains('Desde aquí puedo ir a: Pasillo norte');
    });
  });

  it('looks the room depending on conditions', () => {
    const request = aDfaRequest()
      .withIntent('look')
      .withArgs({ arg: null })
      .withData({ roomId: 'comedor', picked: ['comedor-cartera'] })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('Estoy en el comedor de la nave espacial');
    expect(getDfaApp().lastAsk).to.not.contains('También veo algo en el suelo.');
  });

  const ARGS = ['Ventanas al exterior', ['Ventanas al exterior'], 'ventana', 'véntana'];

  ARGS.forEach((arg) => {
    it(`looks the description of the object when argument is given - ${JSON.stringify(arg)}`, () => {
      const request = aDfaRequest()
        .withIntent('look')
        .withArgs({ arg })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().lastAsk).to.equal(scure.items.getItem('sala-mandos-ventanas').description);
    });
  });

  it('looks the description of the item when in inventory', () => {
    const request = aDfaRequest()
      .withIntent('look')
      .withArgs({ arg: 'combinación 4815' })
      .withData({ roomId: 'sala-mandos', inventory: ['combinacion-4815'] })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.equal(scure.items.getItem('combinacion-4815').description);
  });

  it('looks the description of the proper item when in room', () => {
    const request = aDfaRequest()
      .withIntent('look')
      .withArgs({ arg: 'paredes' })
      .withData({ roomId: 'pasillo-sur' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.equal(scure.items.getItem('passur-pared').description);
  });

  it('looks the description of the proper item in a universally located item (item.location == null)', () => {
    const request = aDfaRequest()
      .withIntent('look')
      .withArgs({ arg: 'robot' })
      .withData({ roomId: 'habitacion-108' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('RIC');
  });

  const INVALID_ARGS = ['ventana', 'not a valid object'];

  INVALID_ARGS.forEach((arg) => {
    it(`cannot look an object when not in place or not valid obj - ${JSON.stringify(arg)}`, () => {
      const request = aDfaRequest()
        .withIntent('look')
        .withArgs({ arg })
        .withData({ roomId: 'pasillo-central' })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().lastAsk).to.contains('No encuentro o veo ese objeto.');
    });
  });

  describe('changes description of things depending on condition picked', () => {
    it('shows default description when object is not picked up', () => {
      const request = aDfaRequest()
        .withIntent('look')
        .withArgs({ arg: 'suelo' })
        .withData({ roomId: 'comedor' })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().lastAsk).to.contains('Veo una cartera en el suelo');
    });

    it('shows another description when object is picked up', () => {
      const request = aDfaRequest()
        .withIntent('look')
        .withArgs({ arg: 'suelo' })
        .withData({ roomId: 'comedor', picked: ['comedor-cartera'] })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().lastAsk).to.contains('Es el suelo. No veo nada más.');
    });
  });
});
