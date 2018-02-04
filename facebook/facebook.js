/* eslint-disable no-console,class-methods-use-this,no-plusplus,
no-lone-blocks,no-use-before-define,camelcase */
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const apiai = require('apiai');
const uuid = require('uuid');
const request = require('request');
const async = require('async');
const fbConfig = require('./fbConfig').fbConfig;

const DEFAULT_APIAI_LANG = process.env.APIAI_LANG || 'es';
const FB_TEXT_LIMIT = 640;

const FACEBOOK_LOCATION = 'FACEBOOK_LOCATION';
const FACEBOOK_WELCOME = 'FACEBOOK_WELCOME';

const ACCEPTED_LANGUAGES = ['es', 'en'];

const APIAI_ACCESS_TOKEN = fbConfig.APIAI_ACCESS_TOKEN;
const FB_VERIFY_TOKEN = fbConfig.FB_VERIFY_TOKEN;
const FB_PAGE_ACCESS_TOKEN = fbConfig.FB_PAGE_ACCESS_TOKEN;

const UserDataRepository = require('./user-data').UserDataRepository;

const getLanguage = (locale) => {
  console.log('User locale', locale);
  if (!locale) return DEFAULT_APIAI_LANG;
  const lang = locale.indexOf('_') > 0 ? locale.substring(0, locale.indexOf('_')) : locale;
  return ACCEPTED_LANGUAGES.indexOf(lang) >= 0 ? lang : DEFAULT_APIAI_LANG;
};

class FacebookBot {
  constructor(userDataRepository) {
    this.apiAiService = apiai(APIAI_ACCESS_TOKEN, { language: DEFAULT_APIAI_LANG, requestSource: 'fb' });
    this.sessionIds = new Map();
    this.messagesDelay = 200;
    this.userDataRepository = userDataRepository;
  }

  getUserLocale(id) {
    return this.userDataRepository.getUserData(id)
      .then(data => data.locale);
  }

  doDataResponse(sender, facebookResponseData) {
    if (!Array.isArray(facebookResponseData)) {
      console.log('Response as formatted message');
      this.sendFBMessage(sender, facebookResponseData)
        .catch(err => console.error('sendfbmess', err));
    } else {
      async.eachSeries(facebookResponseData, (facebookMessage, callback) => {
        if (facebookMessage.sender_action) {
          console.log('Response as sender action');
          this.sendFBSenderAction(sender, facebookMessage.sender_action)
            .then(() => callback())
            .catch(err => callback(err));
        } else {
          console.log('Response as formatted message');
          this.sendFBMessage(sender, facebookMessage)
            .then(() => callback())
            .catch(err => callback(err));
        }
      }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Data response completed');
        }
      });
    }
  }

  doRichContentResponse(sender, messages) {
    const facebookMessages = []; // array with result messages

    for (let messageIndex = 0; messageIndex < messages.length; messageIndex++) {
      const message = messages[messageIndex];

      switch (message.type) {
        // message.type 0 means text message
        case 0:
          // speech: ["hi"]
          // we have to get value from fulfillment.speech, because of here is raw speech
          if (message.speech) {
            const splittedText = this.splitResponse(message.speech);

            splittedText.forEach((s) => {
              facebookMessages.push({ text: s });
            });
          }

          break;
        // message.type 1 means card message
        case 1: {
          const carousel = [message];

          for (messageIndex++; messageIndex < messages.length; messageIndex++) {
            if (messages[messageIndex].type === 1) {
              carousel.push(messages[messageIndex]);
            } else {
              messageIndex--;
              break;
            }
          }

          const facebookMessage = {};
          carousel.forEach((c) => {
            // buttons: [ {text: "hi", postback: "postback"} ],
            // imageUrl: "", title: "", subtitle: ""

            const card = {};

            card.title = c.title;
            card.image_url = c.imageUrl;
            if (this.isDefined(c.subtitle)) {
              card.subtitle = c.subtitle;
            }
            // If button is involved in.
            if (c.buttons.length > 0) {
              const buttons = [];
              for (let buttonIndex = 0; buttonIndex < c.buttons.length; buttonIndex++) {
                const button = c.buttons[buttonIndex];

                if (button.text) {
                  let postback = button.postback;
                  if (!postback) {
                    postback = button.text;
                  }

                  const buttonDescription = {
                    title: button.text,
                  };

                  if (postback.startsWith('http')) {
                    buttonDescription.type = 'web_url';
                    buttonDescription.url = postback;
                  } else {
                    buttonDescription.type = 'postback';
                    buttonDescription.payload = postback;
                  }

                  buttons.push(buttonDescription);
                }
              }

              if (buttons.length > 0) {
                card.buttons = buttons;
              }
            }

            if (!facebookMessage.attachment) {
              facebookMessage.attachment = { type: 'template' };
            }

            if (!facebookMessage.attachment.payload) {
              facebookMessage.attachment.payload = { template_type: 'generic', elements: [] };
            }

            facebookMessage.attachment.payload.elements.push(card);
          });

          facebookMessages.push(facebookMessage);
        }

          break;
        // message.type 2 means quick replies message
        case 2: {
          if (message.replies && message.replies.length > 0) {
            const facebookMessage = {};

            facebookMessage.text = message.title ? message.title : 'Choose an item';
            facebookMessage.quick_replies = [];

            message.replies.forEach((r) => {
              facebookMessage.quick_replies.push({
                content_type: 'text',
                title: r,
                payload: r,
              });
            });

            facebookMessages.push(facebookMessage);
          }
        }

          break;
        // message.type 3 means image message
        case 3:

          if (message.imageUrl) {
            const facebookMessage = {};

            // "imageUrl": "http://example.com/image.jpg"
            facebookMessage.attachment = { type: 'image' };
            facebookMessage.attachment.payload = { url: message.imageUrl };

            facebookMessages.push(facebookMessage);
          }

          break;
        // message.type 4 means custom payload message
        case 4:
          if (message.payload && message.payload.facebook) {
            facebookMessages.push(message.payload.facebook);
          }
          break;

        default:
          break;
      }
    }

    return new Promise((resolve, reject) => {
      async.eachSeries(facebookMessages, (msg, callback) => {
        this.sendFBSenderAction(sender, 'typing_on')
          .then(() => this.sleep(this.messagesDelay))
          .then(() => this.sendFBMessage(sender, msg))
          .then(() => callback())
          .catch(callback);
      },
      (err) => {
        if (err) {
          console.error('error facebook messages', err);
          reject(err);
        } else {
          console.log('Messages sent');
          resolve();
        }
      });
    });
  }

  doTextResponse(sender, responseText) {
    console.log('Response as text message');
    // facebook API limit for text length is 640,
    // so we must split message if needed
    const splittedText = this.splitResponse(responseText);

    async.eachSeries(splittedText, (textPart, callback) => {
      this.sendFBMessage(sender, { text: textPart })
        .then(() => callback())
        .catch(err => callback(err));
    });
  }

  // which webhook event
  getEventText(event) {
    if (event.message) {
      if (event.message.quick_reply && event.message.quick_reply.payload) {
        return event.message.quick_reply.payload;
      }

      if (event.message.text) {
        return event.message.text;
      }
    }

    if (event.postback && event.postback.payload) {
      return event.postback.payload;
    }

    return null;
  }

  getFacebookEvent(event) {
    if (event.postback && event.postback.payload) {
      const payload = event.postback.payload;

      switch (payload) {
        case FACEBOOK_WELCOME:
          return { name: FACEBOOK_WELCOME };

        case FACEBOOK_LOCATION:
          return { name: FACEBOOK_LOCATION, data: event.postback.data };
        default:
          return null;
      }
    }

    return null;
  }

  processFacebookEvent(event) {
    const sender = event.sender.id.toString();
    const eventObject = this.getFacebookEvent(event);

    if (eventObject) {
      // Handle a text message from this sender
      if (!this.sessionIds.has(sender)) {
        this.sessionIds.set(sender, uuid.v4());
      }

      const apiaiRequest = this.apiAiService.eventRequest(eventObject,
        {
          sessionId: this.sessionIds.get(sender),
          originalRequest: {
            data: event,
            source: 'facebook',
          },
        });
      this.getUserLocale(sender)
        .then((locale) => {
          apiaiRequest.language = getLanguage(locale);
          this.doApiAiRequest(apiaiRequest, sender);
        });
    }
  }

  processMessageEvent(event) {
    const sender = event.sender.id.toString();
    const text = this.getEventText(event);

    if (text) {
      // Handle a text message from this sender
      if (!this.sessionIds.has(sender)) {
        this.sessionIds.set(sender, uuid.v4());
      }

      console.log('Text', text);
      // send user's text to api.ai service
      const apiaiRequest = this.apiAiService.textRequest(text,
        {
          sessionId: this.sessionIds.get(sender),
          originalRequest: {
            data: event,
            source: 'facebook',
          },
        });

      this.getUserLocale(sender)
        .then((locale) => {
          apiaiRequest.language = getLanguage(locale);
          console.log('Injecting language', apiaiRequest.language);
          this.doApiAiRequest(apiaiRequest, sender);
        });
    }
  }

  doApiAiRequest(apiaiRequest, sender) {
    const handleFacebookResponse = (response) => {
      if (this.isDefined(response.result) && this.isDefined(response.result.fulfillment)) {
        const responseText = response.result.fulfillment.speech;
        const responseData = response.result.fulfillment.data;
        const responseMessages = response.result.fulfillment.messages;

        console.log('responseText', responseText);
        console.log('responseData', responseData);
        console.log('responseMessages', responseMessages);

        if (this.isDefined(responseData) && this.isDefined(responseData.facebook)) {
          const facebookResponseData = responseData.facebook;
          this.doDataResponse(sender, facebookResponseData);
        } else if (this.isDefined(responseMessages) && responseMessages.length > 0) {
          this.doRichContentResponse(sender, responseMessages);
        } else if (this.isDefined(responseText)) {
          this.doTextResponse(sender, responseText);
        }
      }
    };

    const doRequest = () => {
      apiaiRequest.on('response', handleFacebookResponse);
      apiaiRequest.on('error', tryAgainIfFirstTime);
      apiaiRequest.end();
    };

    const tryAgainIfFirstTime = (error) => {
      console.error('error apiaiRequest', error);
      if (!firstTime) return;
      console.log('trying again');
      firstTime = false;
      doRequest();
    };

    let firstTime = true;
    doRequest();
  }

  splitResponse(str) {
    if (str.length <= FB_TEXT_LIMIT) {
      return [str];
    }

    return this.chunkString(str, FB_TEXT_LIMIT);
  }

  chunkString(s, len) {
    let curr = len;
    let prev = 0;

    const output = [];

    while (s[curr]) {
      if (s[curr++] === ' ') {
        output.push(s.substring(prev, curr));
        prev = curr;
        curr += len;
      } else {
        let currReverse = curr;
        do {
          if (s.substring(currReverse - 1, currReverse) === ' ') {
            output.push(s.substring(prev, currReverse));
            prev = currReverse;
            curr = currReverse + len;
            break;
          }
          currReverse--;
        } while (currReverse > prev);
      }
    }
    output.push(s.substr(prev));
    return output;
  }

  sendFBMessage(sender, messageData) {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FB_PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
          messaging_type: 'RESPONSE',
          recipient: { id: sender },
          message: messageData,
        },
      }, (error, response) => {
        if (error) {
          console.log('Error sending message: ', error);
          reject(error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
          reject(new Error(response.body.error));
        }

        resolve();
      });
    });
  }

  sendFBSenderAction(sender, action) {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FB_PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
          messaging_type: 'RESPONSE',
          recipient: { id: sender },
          sender_action: action,
        },
      }, (error, response) => {
        if (error) {
          console.error('Error sending action: ', error);
          reject(error);
        } else if (response.body.error) {
          console.error('Error: ', response.body.error);
          reject(new Error(response.body.error));
        }

        resolve();
      });
    });
  }

  doSubscribeRequest() {
    request({
      method: 'POST',
      uri: `https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=${FB_PAGE_ACCESS_TOKEN}`,
    },
    (error, response) => {
      if (error) {
        console.error('Error while subscription: ', error);
      } else {
        console.log('Subscription result: ', response.body);
      }
    });
  }

  isDefined(obj) {
    if (typeof obj === 'undefined') {
      return false;
    }

    if (!obj) {
      return false;
    }

    return obj != null;
  }

  sleep(delay) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), delay);
    });
  }

}

const webhookGet = facebookBot => (req, res) => {
  if (req.query['hub.verify_token'] === FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);

    setTimeout(() => {
      facebookBot.doSubscribeRequest();
    }, 3000);
  } else {
    res.send('Error, wrong validation token');
  }
};


const webhookPost = facebookBot => (req, res) => {
  try {
    const data = req.body;
    console.log('req body', JSON.stringify(data));

    if (data.entry) {
      const entries = data.entry;
      entries.forEach((entry) => {
        const messaging_events = entry.messaging;
        if (messaging_events) {
          messaging_events.forEach((event) => {
            if (event.message && !event.message.is_echo) {
              if (event.message.attachments) {
                const locations = event.message.attachments.filter(a => a.type === 'location');

                // delete all locations from original message
                event.message.attachments = event.message.attachments.filter(a => a.type !== 'location');

                if (locations.length > 0) {
                  locations.forEach((l) => {
                    const locationEvent = {
                      sender: event.sender,
                      postback: {
                        payload: 'FACEBOOK_LOCATION',
                        data: l.payload.coordinates,
                      },
                    };

                    facebookBot.processFacebookEvent(locationEvent);
                  });
                }
              }

              facebookBot.processMessageEvent(event);
            } else if (event.postback && event.postback.payload) {
              if (event.postback.payload === 'FACEBOOK_WELCOME') {
                facebookBot.processFacebookEvent(event);
              } else {
                facebookBot.processMessageEvent(event);
              }
            }
          });
        }
      });
    }

    return res.status(200).json({
      status: 'ok',
    });
  } catch (err) {
    console.log('400 general', err);
    return res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

const userDataRepository = new UserDataRepository();

const facebookBot = new FacebookBot(userDataRepository);

exports.facebookBot = facebookBot;
exports.webhookGet = webhookGet(facebookBot);
exports.webhookPost = webhookPost(facebookBot);
