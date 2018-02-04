const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const fbConfig = require('./fbConfig').fbConfig;

const FB_PAGE_ACCESS_TOKEN = fbConfig.FB_PAGE_ACCESS_TOKEN;
admin.initializeApp(functions.config().firebase);

const saveInDatabaseCache = id => userData =>
  admin.database().ref(`/facebook/user-data/${id}`).set(userData)
    .then(() => userData);

const getFromDatabaseCache = id =>
  admin.database().ref(`/facebook/user-data/${id}`).once('value')
    .then(snapshot => snapshot.val());

const saveInLocalCache = (userDataLocalCache, id) => (userData) => {
  console.log('saving in local cache', userData);
  userDataLocalCache.set(id, userData);
  console.log(userDataLocalCache);
  return userData;
};

const doUserDataRequest = id =>
  new Promise((resolve, reject) => {
    request({
      url: `https://graph.facebook.com/v2.6/${id}`,
      qs: { fields: 'locale,first_name,last_name', access_token: FB_PAGE_ACCESS_TOKEN },
      method: 'GET',
    }, (error, response) => {
      if (error) {
        console.log('Error sending message User Locale: ', error);
        reject(error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
        reject(new Error(response.body.error));
      }
      console.log('Received user data from fb', response.body);
      resolve(JSON.parse(response.body));
    });
  });

class UserDataRepository {
  constructor() {
    this.userDataLocalCache = new Map();
  }

  getUserData(id) {
    if (this.userDataLocalCache.has(id)) {
      console.log('Getting from cache user data', this.userDataLocalCache.get(id));
      return Promise.resolve(this.userDataLocalCache.get(id));
    }

    return getFromDatabaseCache(id)
      .then((userDataFromDatabaseCache) => {
        console.log('from database cache monsieur - ', userDataFromDatabaseCache);
        if (userDataFromDatabaseCache) {
          console.log('will save in local cache');
          return saveInLocalCache(this.userDataLocalCache, id)(userDataFromDatabaseCache);
        }
        console.log('trying from facebook');
        return doUserDataRequest(id)
          .then(saveInLocalCache(this.userDataLocalCache, id))
          .then(saveInDatabaseCache(id))
          .catch(err => Promise.reject(err));
      });
  }
}

exports.UserDataRepository = UserDataRepository;

