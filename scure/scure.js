const joinMultipleStrings = (arr) => {
  if (arr.length === 1) return arr[0];
  return `${arr.slice(0, arr.length - 1).join(', ')} y ${arr[arr.length - 1]}`;
};

class Scure {
  constructor(data) {
    this.data = data;
  }

  getInit() {
    return this.data.init;
  }

  getRoom(id) {
    return this.data.rooms.find(r => r.id === id);
  }

  getRoomByName(name) {
    return this.data.rooms.find(r => r.name.toLowerCase() === name.toLowerCase());
  }

  isAllowedDestination(destinationName, id) {
    const room = this.getRoomByName(destinationName);
    if (!room) return false;
    const destIds = this.data.map[id];
    return destIds.indexOf(room.id) >= 0;
  }

  getDestinationNamesFrom(id) {
    const destIds = this.data.map[id];
    const destNames = destIds.map(rId => this.getRoom(rId).name);
    return joinMultipleStrings(destNames);
  }

  getItem(id) {
    return this.data.items.find(i => i.id === id);
  }
}

const buildScureFor = data => new Scure(data);

exports.buildScureFor = buildScureFor;

