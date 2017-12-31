const ricEscape = require('../index.js');
const ricEscapeData = require('../ric-escape-data').data;
const scure = require('../scure/scure').buildScureFor(ricEscapeData);

describe('Ric Escape - when using', () => {
  it('tells you to specify object if no arg', () => {
    const request = aDfaRequestBuilder()
      .withIntent('use')
      .withArgs({ arg: null })
      .withData({ roomId: 'sala-mandos' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.equal(scure.sentences.get('use-noarg'));
  });

  it('tells you it cannot be used if object does not exist', () => {
    const request = aDfaRequestBuilder()
      .withIntent('use')
      .withArgs({ arg: 'Cuadro' })
      .withData({ roomId: 'sala-mandos' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.equal(scure.sentences.get('use-cant'));
  });

  it('tells you it cannot be used if object has no use', () => {
    const request = aDfaRequestBuilder()
      .withIntent('use')
      .withArgs({ arg: 'sillas' })
      .withData({ roomId: 'sala-mandos' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.equal(scure.sentences.get('use-cant'));
  });


  it('uses objects', () => {
    const request = aDfaRequestBuilder()
      .withIntent('use')
      .withArgs({ arg: 'diario de abordo' })
      .withData({ roomId: 'sala-mandos' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('Los primeros minutos del diario');
  });

  it('tells another response a second time', () => {
    const request = aDfaRequestBuilder()
      .withIntent('use')
      .withArgs({ arg: 'diario de abordo' })
      .withData({ roomId: 'sala-mandos', usages: { 'sala-mandos-diario': 1 } })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('Los siguientes minutos del diario');
  });

  it('tells another response a third time', () => {
    const request = aDfaRequestBuilder()
      .withIntent('use')
      .withArgs({ arg: 'diario de abordo' })
      .withData({ roomId: 'sala-mandos', usages: { 'sala-mandos-diario': 2 } })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('Los últimos minutos del diario');
  });
});
