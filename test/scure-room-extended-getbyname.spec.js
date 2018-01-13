const ricEscapeData = require('../ric-escape-data').data['es'];
const scure = require('../scure/scure').buildScureFor(ricEscapeData);

describe('Ric Escape - room extended getByName', () => {
  it('gets a room name without stop words', () => {
    const room = scure.rooms.getRoomByName('sala mando');

    expect(room.id).to.eql('sala-mandos');
  });

});
