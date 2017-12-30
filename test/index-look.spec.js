const ricEscape = require('../index.js');
const ricEscapeData = require('../ric-escape-data').data;
const scure = require('../scure/scure').buildScureFor(ricEscapeData);


describe('Ric Escape - when looking up', () => {
  const EMPTY_ARGS = [null, undefined, '', ' ', [], {}];

  EMPTY_ARGS.forEach((arg) => {
    it(`looks the room when no argument given (arg: ${arg})`, () => {
      const request = aDfaRequestBuilder()
        .withIntent('look')
        .withArgs({ arg })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().lastAsk).to.equal(scure.rooms.getRoom('sala-mandos').description);
    });
  });

  const ARGS = ['Ventanas al exterior', ['Ventanas al exterior'], 'ventana'];

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
  // PENDING: able to look several differnet things (ex: paredes)
});
