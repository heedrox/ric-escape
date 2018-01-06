const ricEscape = require('../index.js');
const ricEscapeData = require('../ric-escape-data').data;
const scure = require('../scure/scure').buildScureFor(ricEscapeData);

const ABOUT_90_MINUTES_AGO = new Date(new Date().getTime() - (90 * 1000 * 60));

describe('Ric Escape - others', () => {
  const TEST_CASES = [
    { data: null, expectedNumCommands: 1 },
    { data: { numCommands: 1 }, expectedNumCommands: 2 },
  ];

  TEST_CASES.forEach((testCase) => {
    it(`Counts num of commands for expected ${testCase.expectedNumCommands}: `, () => {
      const request = aDfaRequestBuilder()
        .withIntent('help')
        .withData(testCase.data)
        .build();

      ricEscape.ricEscape(request);

      expect(getDfaApp().data.numCommands).to.equal(testCase.expectedNumCommands);
    });
  });

  it('welcomes you', () => {
    const request = aDfaRequestBuilder()
      .withIntent('input.welcome')
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.contains('¡Hola!');
  });

  it('tells you the time when help', () => {
    const request = aDfaRequestBuilder()
      .withIntent('help')
      .build();

    ricEscape.ricEscape(request);

    const text = getDfaApp().lastAsk.items[0].simpleResponse.textToSpeech;
    expect(text).to.contains('Me puedes dar las siguientes instrucciones: Mirar, Usar, Ir, Coger e Inventario.');
    expect(text).to.contains('Nos quedan');
    expect(text).to.contains('minutos y');
    expect(text).to.contains('segundos para estrellarnos.');
    expect(getDfaApp().lastAsk.items[1].basicCard.image.url).to.contains('ric-escape-map.jpg');
  });

  it('says goodbye if bye intent', () => {
    const request = aDfaRequestBuilder()
      .withIntent('bye')
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastTell).to.contains('Adiós.');
  });

  it('finishes when time is up', () => {
    const request = aDfaRequestBuilder()
      .withIntent('bye')
      .withData({ startTime: JSON.stringify(ABOUT_90_MINUTES_AGO) })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastTell).to.contains(scure.sentences.get('end-timeover'));
  });
});
