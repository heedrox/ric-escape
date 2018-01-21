const ricEscape = require('../index.js');

describe('Ric Escape - adds platform for analytics', () => {
  const TEST_CASES = [
    { event: 'GOOGLE_ASSISTANT_WELCOME', expectedPlatform: 'GOOGLE_ASSISTANT' },
    { event: 'FACEBOOK_WELCOME', expectedPlatform: 'FACEBOOK' },
    { event: 'TELEGRAM_WELCOME', expectedPlatform: 'TELEGRAM' },
    { event: null, expectedPlatform: 'PREVIOUS_SETTED_PLATFORM' },
  ];

  TEST_CASES.forEach((test) => {
    it('adds google assistant when welcome', () => {
      const request = aDfaRequest()
        .withIntent('look')
        .withData({ platform: 'PREVIOUS_SETTED_PLATFORM' })
        .build();
      request.body.result.resolvedQuery = test.event;

      ricEscape.ricEscape(request);

      expect(getDfaApp().data.platform).to.equal(test.expectedPlatform);
    });
  });
});
