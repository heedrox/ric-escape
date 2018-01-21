class DialogflowAppMock {

  constructor(options) {
    this.lastAsk = '';
    this.lastTell = '';
    this.request = options.request;
    this.response = options.response;
    this.data = options.request.body.data;
    this.locale = options.request.body.locale;
    this.SurfaceCapabilities = { AUDIO_OUTPUT: 'AUDIO_OUTPUT', SCREEN_OUTPUT: 'SCREEN_OUTPUT' };
    this.capabilities = options.request.body.capabilities;
    global.dfaApp = this;
  }

  getArgument(argName) {
    return this.request.body.args[argName];
  }

  getUserLocale() {
    return this.locale;
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

  hasSurfaceCapability(capability) {
    return this.capabilities.indexOf(capability) > -1;
  }
}

class DfaRequestBuilder {
  constructor() {
    this.intent = '';
    this.args = [];
    this.data = {};
    this.rawInput = null;
    this.locale = null;
    this.capabilities = ['AUDIO_OUTPUT', 'SCREEN_OUTPUT'];
  }

  withSurfaceCapabilities(capabilities) {
    this.capabilities = capabilities;
    return this;
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
    if (this.data && !this.data.numCommands) this.data.numCommands = 20;
    return this;
  }

  withRawInput(rawInput) {
    this.rawInput = rawInput;
    return this;
  }

  withLocale(locale) {
    this.locale = locale;
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
        locale: this.locale,
        capabilities: this.capabilities,
      },
      headers: [],
    };
  }
}

const aDfaRequest = () => new DfaRequestBuilder();

exports.DialogflowAppMock = DialogflowAppMock;
exports.DfaRequestBuilder = DfaRequestBuilder;

exports.aDfaRequest = aDfaRequest;
exports.getDfaApp = () => global.dfaApp;
