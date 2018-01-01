require('./common.js');
const ricEscape = require('../index.js');

const c = (intent, arg) => ({ intent, arg });

const commands = [
  c('input.welcome', ''),
  c('input.unknown', ''),
  c('input.unknown', ''),
  c('look', ''),
  c('look', 'diario de abordo'),
  c('look', 'diario de abordo'),
  c('walk', 'pasillo norte'),
  c('walk', 'comedor'),
  c('look', ''),
  c('look', 'suelo'),
  c('pickup', 'cartera'),
  c('use', 'cartera'),
];

commands.forEach((command) => {
  const request = aDfaRequestBuilder()
    .withIntent(command.intent)
    .withArgs({ arg: command.arg })
    .withData(getDfaApp() ? getDfaApp().data : null)
    .build();

  ricEscape.ricEscape(request);

  console.log('RIC says: ', getDfaApp().lastAsk);
  console.log('RICs data', getDfaApp().data);
});

