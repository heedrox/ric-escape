const ricEscape = require('../index.js');

describe('Ric Escape - adds platform for analytics', () => {
  const TEST_CASES = [
    { source: 'google', expectedPlatform: 'google' },
    { source: 'facebook', expectedPlatform: 'facebook' },
    { source: 'telegram', expectedPlatform: 'telegram' },
    { source: null, expectedPlatform: 'PREVIOUS_SETTED_PLATFORM' },
  ];

  TEST_CASES.forEach((test) => {
    it('adds google assistant when welcome', () => {
      const request = aDfaRequest()
        .withIntent('look')
        .withData({ platform: 'PREVIOUS_SETTED_PLATFORM' })
        .build();
      request.body.originalRequest = { source: test.source };

      ricEscape.ricEscape(request);

      expect(getDfaApp().data.platform).to.equal(test.expectedPlatform);
    });
  });
});
