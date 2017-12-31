const ricEscape = require('../index.js');
const ricEscapeData = require('../ric-escape-data').data;
const scure = require('../scure/scure').buildScureFor(ricEscapeData);


describe('Ric Escape - when looking up', () => {
  const EMPTY_ARGS = [null, undefined, '', ' ', [], {}];

  EMPTY_ARGS.forEach((arg) => {
    it(`looks the room and shows destinations when no argument given (arg: ${arg})`, () => {
      const request = aDfaRequestBuilder()
        .withIntent('look')
        .withArgs({ arg })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().lastAsk).to.contains(scure.rooms.getRoom('sala-mandos').description);
      expect(getDfaApp().lastAsk).to.contains('Desde aquí puedo ir a: Pasillo norte');
    });
  });

  const ARGS = ['Ventanas al exterior', ['Ventanas al exterior'], 'ventana', 'véntana'];

  ARGS.forEach((arg) => {
    it(`looks the description of the object when argument is given - ${JSON.stringify(arg)}`, () => {
      const request = aDfaRequestBuilder()
        .withIntent('look')
        .withArgs({ arg })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().lastAsk).to.equal(scure.items.getItem('sala-mandos-ventanas').description);
    });
  });

  const INVALID_ARGS = ['ventana', 'not a valid object'];

  INVALID_ARGS.forEach((arg) => {
    it(`cannot look an object when not in place or not valid obj - ${JSON.stringify(arg)}`, () => {
      const request = aDfaRequestBuilder()
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
      const request = aDfaRequestBuilder()
        .withIntent('look')
        .withArgs({ arg: 'suelo' })
        .withData({ roomId: 'comedor' })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().lastAsk).to.contains('Veo una cartera en el suelo');
    });

    it('shows another description when object is picked up', () => {
      const request = aDfaRequestBuilder()
        .withIntent('look')
        .withArgs({ arg: 'suelo' })
        .withData({ roomId: 'comedor', picked: ['comedor-cartera'] })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().lastAsk).to.contains('Es el suelo. No veo nada más.');
    });
  });

  // PENDING: able to look several differnet things (ex: paredes)
});
