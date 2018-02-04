const admin = require('firebase-admin');
const uuid = require('uuid');

const buildObj = sessionId => ({
  id: sessionId,
  dateCreated: JSON.stringify(new Date()),
});
const saveInDatabaseCache = sender => sessionId =>
  admin.database().ref(`/facebook/session-data/${sender}`).set(buildObj(sessionId))
    .then(() => sessionId);

const getFromDatabaseCache = sender =>
  admin.database().ref(`/facebook/session-data/${sender}`).once('value')
    .then(snapshot => (snapshot.val() ? snapshot.val().id : null));

const saveInLocalCache = (sessionLocalCache, sender) => (finalId) => {
  console.log('saving session in local cache', finalId);
  sessionLocalCache.set(sender, buildObj(finalId));
  console.log(sessionLocalCache);
  return finalId;
};

const getNew = () => Promise.resolve(uuid.v4());

class SessionDataRepository {
  constructor() {
    this.sessionIds = new Map();
  }

  get(sender) {
    if (this.sessionIds.has(sender)) {
      console.log('Getting from local cache session ', this.sessionIds.get(sender));
      return Promise.resolve(this.sessionIds.get(sender).id);
    }

    return getFromDatabaseCache(sender)
      .then((sessionId) => {
        console.log('session from database cache - ', sessionId);
        if (sessionId) {
          console.log('will save in local cache');
          return saveInLocalCache(this.sessionIds, sender)(sessionId);
        }
        console.log('creating');
        return getNew()
          .then(saveInLocalCache(this.sessionIds, sender))
          .then(saveInDatabaseCache(sender))
          .catch(err => Promise.reject(err));
      });
  }
}

exports.SessionDataRepository = SessionDataRepository;

