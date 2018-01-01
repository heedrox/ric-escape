const isEmptyArg = require('../lib/common').isEmptyArg;
const isTextEqual = require('./scure-commons').isTextEqual;
const joinMultipleStrings = require('./scure-commons').joinMultipleStrings;
const isSynonym = require('./scure-commons').isSynonym;
const buildUsageIndex = require('./scure-commons').buildUsageIndex;

class ScureSentences {
  constructor(data) {
    this.data = data;
  }

  get(key, args) {
    if (!args || args.length === 0) return this.data.sentences[key];
    const replacer = (s1, s2) => s1.replace(`{${s2}}`, args[s2]);
    return Object.keys(args).reduce(replacer, this.data.sentences[key]);
  }
}

const increaseUsageIndex = (index, usages) => {
  if (JSON.stringify(usages) === '[]') usages = {};
  if (typeof usages !== 'object') usages = {};
  if (!usages) usages = {};
  usages[index] = (usages[index] + 1) || 1;
  return usages;
};

class ScureUsages {
  constructor(data) {
    this.data = data;
  }

  getByItemId(itemId) {
    return this.data.usages.find(i => i.items === itemId);
  }

  getByItemIds(itemId1, itemId2) {
    const containsBoth = i => (i.items.indexOf(itemId1) >= 0 && i.items.indexOf(itemId2) >= 0);
    return this.data.usages.find(containsBoth);
  }

  isUsed(itemId, usages) {
    if (!usages) return false;
    if (!this.getByItemId(itemId)) return false;
    if (!usages[itemId]) return false;
    return usages[itemId] >= 1;
  }

  isUsedCombination(itemId1,itemId2, usages) {
    if (!usages) return false;
    if (!this.getByItemIds(itemId1, itemId2)) return false;
    const usageIndex = buildUsageIndex(itemId1, itemId2);
    return usages[usageIndex] >= 1;
  }

  increaseUsage(item, usages) {
    if (!this.getByItemId(item.id)) return false;
    return increaseUsageIndex(item.id, usages);
  }

  increaseUsageForTwo(item1, item2, usages) {
    if (!this.getByItemIds(item1.id, item2.id)) return false;
    const usageIndex = buildUsageIndex(item1.id, item2.id);
    return increaseUsageIndex(usageIndex, usages);
  }
}
class ScureItems {
  constructor(data) {
    this.data = data;
  }

  getItem(id) {
    return this.data.items.find(i => i.id === id);
  }

  getItemByName(name) {
    if (isEmptyArg(name)) return null;
    return this.data.items.find(i => isTextEqual(i.name, name) || isSynonym(i.synonyms, name));
  }

  getItemByNameAndRoom(name, roomId) {
    if (isEmptyArg(name)) return null;
    return this.data.items.find(i =>
      (isTextEqual(i.name, name) || isSynonym(i.synonyms, name))
      && (i.location === roomId));
  }

  getBestItem(itemName, roomId) {
    const exactItemFromRoom = this.getItemByNameAndRoom(itemName, roomId);
    if (exactItemFromRoom) return exactItemFromRoom;
    return this.getItemByName(itemName);
  }

  isInInventory(itemId, inventory) {
    if (!inventory) return false;
    if (!this.getItem(itemId)) return false;
    if (typeof inventory.length !== 'number') return false;
    return inventory.indexOf(itemId) >= 0;
  }

  isPicked(itemId, picked) {
    if (!picked) return false;
    if (!this.getItem(itemId)) return false;
    if (typeof picked.length !== 'number') return false;
    return picked.indexOf(itemId) >= 0;
  }
}

class ScureRooms {
  constructor(data) {
    this.data = data;
  }

  getRoom(id) {
    return this.data.rooms.find(r => r.id === id);
  }

  getRoomByName(name) {
    return this.data.rooms.find(r => isTextEqual(r.name, name) || isSynonym(r.synonyms, name));
  }

  getUnlockedDestinationsIds(fromId, unlocked) {
    const isUnlocked = destination => (unlocked && unlocked.indexOf(destination.lock) >= 0);
    const getId = (destination) => {
      if (!destination.isLockedDestination) return destination;
      if (isUnlocked(destination)) return destination.roomId;
      return null;
    };

    return this.data.map[fromId].map(getId).filter(d => d !== null);
  }

  isAllowedDestination(destinationName, id, unlocked) {
    const room = this.getRoomByName(destinationName);
    if (!room) return false;
    const destIds = this.getUnlockedDestinationsIds(id, unlocked);
    return destIds.indexOf(room.id) >= 0;
  }

  getPossibleDestinationNamesFrom(id, unlocked) {
    const unlockedIds = this.getUnlockedDestinationsIds(id, unlocked);
    const destNames = unlockedIds.map(rId => this.getRoom(rId).name);
    return joinMultipleStrings(destNames);
  }
}

class Scure {
  constructor(data) {
    this.data = data;
    this.sentences = new ScureSentences(data);
    this.items = new ScureItems(data);
    this.rooms = new ScureRooms(data);
    this.usages = new ScureUsages(data);
  }

  getInit() {
    return this.data.init;
  }
}

const buildScureFor = data => new Scure(data);

exports.buildScureFor = buildScureFor;

