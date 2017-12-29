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
}

const buildScureFor = data => new Scure(data);

exports.buildScureFor = buildScureFor;

