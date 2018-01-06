class DialogflowAppMock {

  constructor(options) {
    this.lastAsk = '';
    this.lastTell = '';
    this.request = options.request;
    this.response = options.response;
    this.data = options.request.body.data;
    global.dfaApp = this;
  }

  getArgument(argName) {
    return this.request.body.args[argName];
  }

  handleRequest(map) {
    const intent = this.request.body.intent;
    const func = map.get(intent);
    func(this);
  }

  getIntent() {
    return this.request.body.intent;
  }

  getRawInput() {
    return this.request.body.result.resolvedQuery;
  }

  ask(x) {
    this.lastAsk = x;
  }

  tell(x) {
    this.lastTell = x;
  }

}

class DfaRequestBuilder {
  constructor() {
    this.intent = '';
    this.args = [];
    this.data = {};
    this.rawInput = null;
  }

  withIntent(intent) {
    this.intent = intent;
    return this;
  }

  withArgs(args) {
    this.args = args;
    return this;
  }

  withData(data) {
    this.data = data;
    return this;
  }

  withRawInput(rawInput) {
    this.rawInput = rawInput;
    return this;
  }

  build() {
    return {
      body: {
        intent: this.intent,
        args: this.args,
        data: this.data,
        result: {
          resolvedQuery: this.rawInput,
        },
      },
      headers: [],
    };
  }
}

const aDfaRequestBuilder = () => new DfaRequestBuilder();

exports.DialogflowAppMock = DialogflowAppMock;
exports.DfaRequestBuilder = DfaRequestBuilder;

exports.aDfaRequestBuilder = aDfaRequestBuilder;
exports.getDfaApp = () => global.dfaApp;
