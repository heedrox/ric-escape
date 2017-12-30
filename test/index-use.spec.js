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

  it('uses objects', () => {
    const request = aDfaRequestBuilder()
      .withIntent('use')
      .withArgs({ arg: 'diario de abordo' })
      .withData({ roomId: 'sala-mandos' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('Los primeros minutos del diario');
  });
});
