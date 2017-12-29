class AogMock {

  constructor(options) {
    this.lastAsk = '';
    this.lastTell = '';
    this.request = options.request;
    this.response = options.response;
    global.aogApp = this;
  }

  handleRequest(map) {
    const intent = this.request.body.intent;
    const func = map.get(intent);
    func(this);
  }

  ask(x) {
    this.lastAsk = x;
  }

  tell(x) {
    this.lastTell = x;
  }

}

class AogRequestBuilder {
  constructor() {
    this.intent = '';
  }

  withIntent(intent) {
    this.intent = intent;
    return this;
  }

  build() {
    return {
      body: {
        intent: this.intent,
      },
      headers: [],
    };
  }
}

const anAogRequestBuilder = () => new AogRequestBuilder();

exports.AogMock = AogMock;
exports.AogRequestBuilder = AogRequestBuilder;

exports.anAogRequestBuilder = anAogRequestBuilder;
exports.getAogApp = () => global.aogApp;
