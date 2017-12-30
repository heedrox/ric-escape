const ricEscape = require('../index.js');
const ricEscapeData = require('../ric-escape-data').data;
const scure = require('../scure/scure').buildScureFor(ricEscapeData);

describe('Ric Escape - when picking up', () => {
  it('tells you item unknown when no arg', () => {
    const request = aDfaRequestBuilder()
      .withIntent('pickup')
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.equal(scure.sentences.get('item-unknown'));
  });

  it('tells you item unknown when invalid arg', () => {
    const request = aDfaRequestBuilder()
      .withIntent('pickup')
      .withArgs({ arg: 'not a valid object' })
      .withData({ roomId: 'pasillo-norte' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.equal('No veo el objeto not a valid object por aquí');
  });

  it('tells you item unknown when arg, but in different room', () => {
    const request = aDfaRequestBuilder()
      .withIntent('pickup')
      .withArgs({ arg: 'cartera' })
      .withData({ roomId: 'pasillo-norte' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.equal('No veo el objeto cartera por aquí');
  });

  it('tells you it picked it up when valid arg', () => {
    const request = aDfaRequestBuilder()
      .withIntent('pickup')
      .withArgs({ arg: 'cartera' })
      .withData({ roomId: 'comedor' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.equal('Me llevo el objeto cartera conmigo');
  });

  it('adds the object to inventory', () => {
    const request = aDfaRequestBuilder()
      .withIntent('pickup')
      .withArgs({ arg: 'cartera' })
      .withData({ roomId: 'comedor' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().data.inventory).to.eql(['comedor-cartera']);
  });

  it('tells you it cannot be picked when item not pickable', () => {
    const request = aDfaRequestBuilder()
      .withIntent('pickup')
      .withArgs({ arg: 'ventanas' })
      .withData({ roomId: 'sala-mandos' })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.equal('No puedo llevarme el objeto ventanas al exterior conmigo');
  });

  it('tells you it cannot be picked when item already picked up', () => {
    const request = aDfaRequestBuilder()
      .withIntent('pickup')
      .withArgs({ arg: 'cartera' })
      .withData({ roomId: 'comedor', picked: ['comedor-cartera'] })
      .build();

    ricEscape.ricEscape(request);

    expect(getDfaApp().lastAsk).to.equal('Ya me llevé el objeto cartera.');
  });
});
