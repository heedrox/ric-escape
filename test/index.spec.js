const ricEscape = require('../index.js');
const ricEscapeData = require('../ric-escape-data').data;
const scure = require('../scure/scure').buildScureFor(ricEscapeData);


describe('Ric Escape', () => {
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

  describe('when walking', () => {
    it('changes the roomId when walking', () => {
      const request = aDfaRequestBuilder()
        .withIntent('walk')
        .withArgs({ arg: 'pasillo norte' })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().data.roomId).to.equal('pasillo-norte');
      expect(getDfaApp().lastAsk).to.equal(scure.rooms.getRoom('pasillo-norte').description);
    });

    it('cannot change the roomId when walking to somewhere not according to map', () => {
      const request = aDfaRequestBuilder()
        .withIntent('walk')
        .withArgs({ arg: 'biblioteca' })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().data.roomId).to.equal('sala-mandos');
      expect(getDfaApp().lastAsk).to.contains('No sé ir al sitio biblioteca.');
      expect(getDfaApp().lastAsk).to.contains('Desde aquí puedo ir a: Pasillo norte');
    });

    const TEST_DATA = [
      { room: 'pasillo-norte', destinations: 'Sala de mandos, Comedor y Pasillo central' },
      { room: 'sala-mandos', destinations: 'Pasillo norte' },
      { room: 'pasillo-sur', destinations: 'Habitación 108 y Pasillo central' },
    ];

    TEST_DATA.forEach((data) => {
      it('explains places to go when no arg is given', () => {
        const request = aDfaRequestBuilder()
          .withIntent('walk')
          .withArgs({ })
          .withData({ roomId: data.room })
          .build();

        ricEscape.ricEscape(request);

        expect(getDfaApp().data.roomId).to.equal(data.room);
        expect(getDfaApp().lastAsk).to.equal(`Desde aquí puedo ir a: ${data.destinations}`);
      });
    });


    it('does not change if the room cannot be found', () => {
      const request = aDfaRequestBuilder()
        .withIntent('walk')
        .withArgs({ arg: 'pasillo de la muerte' })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().data.roomId).to.equal('sala-mandos');
      expect(getDfaApp().lastAsk).to.contains('No sé ir al sitio pasillo de la muerte.');
    });
  });

  describe('when looking', () => {
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
  });

  // PENDING: able to look several differnet things (ex: paredes)
});
