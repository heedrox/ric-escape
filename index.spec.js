const ricEscape = require('./index.js');
const ricEscapeData = require('./ric-escape-data').data;
const scure = require('./scure/scure').buildScureFor(ricEscapeData);


describe('Ric Escape', () => {
  it('tells you the time when help', () => {
    const request = anAogRequestBuilder()
      .withIntent('help')
      .build();

    ricEscape.ricEscape(request);

    expect(getAogApp().lastAsk).to.contains('El único que puede ayudarte soy yo, RIC. Me puedes dar las siguientes instrucciones: Mirar, Usar, Ir, Coger e Inventario.');
    expect(getAogApp().lastAsk).to.contains('Nos quedan');
    expect(getAogApp().lastAsk).to.contains('minutos y');
    expect(getAogApp().lastAsk).to.contains('segundos para estrellarnos.');
  });

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

  describe('when walking', () => {
    it('changes the roomId when walking', () => {
      const request = anAogRequestBuilder()
        .withIntent('walk')
        .withArgs({ arg: 'pasillo norte' })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getAogApp().data.roomId).to.equal('pasillo-norte');
      expect(getAogApp().lastAsk).to.equal(scure.getRoom('pasillo-norte').description);
    });

    it('cannot change the roomId when walking to somewhere not according to map', () => {
      const request = anAogRequestBuilder()
        .withIntent('walk')
        .withArgs({ arg: 'biblioteca' })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getAogApp().data.roomId).to.equal('sala-mandos');
      expect(getAogApp().lastAsk).to.contains('No sé ir al sitio biblioteca.');
      expect(getAogApp().lastAsk).to.contains('Desde aquí puedo ir a: Pasillo norte');
    });

    const TEST_DATA = [
      { room: 'pasillo-norte', destinations: 'Sala de mandos, Comedor y Pasillo central' },
      { room: 'sala-mandos', destinations: 'Pasillo norte' },
      { room: 'pasillo-sur', destinations: 'Habitación 108 y Pasillo central' },
    ];

    TEST_DATA.forEach((data) => {
      it('explains places to go when no arg is given', () => {
        const request = anAogRequestBuilder()
          .withIntent('walk')
          .withArgs({ })
          .withData({ roomId: data.room })
          .build();

        ricEscape.ricEscape(request);

        expect(getAogApp().data.roomId).to.equal(data.room);
        expect(getAogApp().lastAsk).to.equal(`Desde aquí puedo ir a: ${data.destinations}`);
      });
    });


    it('does not change if the room cannot be found', () => {
      const request = anAogRequestBuilder()
        .withIntent('walk')
        .withArgs({ arg: 'pasillo de la muerte' })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getAogApp().data.roomId).to.equal('sala-mandos');
      expect(getAogApp().lastAsk).to.contains('No sé ir al sitio pasillo de la muerte.');
    });
  });

  describe('when looking', () => {
    it('looks the room when no argument given', () => {
      const request = anAogRequestBuilder()
        .withIntent('look')
        .withArgs({ })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getAogApp().lastAsk).to.equal(scure.getRoom('sala-mandos').description);
    });

    it('looks the description of the object when argument is given', () => {
      const request = anAogRequestBuilder()
        .withIntent('look')
        .withArgs({ arg: 'key' })
        .withData({ roomId: 'sala-mandos' })
        .build();

      ricEscape.ricEscape(request);

      expect(getAogApp().lastAsk).to.equal(scure.getItem('key').description);
    });
  });
});
