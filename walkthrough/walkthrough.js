require('./common.js');
const ricEscape = require('../index.js');

const c = (intent, arg) => ({ intent, arg });

const commands = [
  c('input.welcome', ''),
  c('input.unknown', ''),
  c('input.unknown', ''),
  c('look', ''),
  c('look', 'diario de abordo'),
  c('use', 'diario de abordo'),
  c('use', 'diario de abordo'),
  c('use', 'diario de abordo'),
  c('walk', 'pasillo norte'),
  c('walk', 'comedor'),
  c('look', ''),
  c('look', 'suelo'),
  c('pickup', 'cartera'),
  c('walk', 'pasillo norte'),
  c('use', 'cartera'),
  c('walk', 'pasillo central'),
  c('walk', 'pasillo sur'),
  c('walk', 'habitacion 108'),
  c('look', 'cama'),
  c('look', 'mesilla'),
  c('look', 'cuadro'),
  c('use', 'cuadro'),
  c('pickup', 'cuadro'),
  c('look', 'cuadro'),
  c('look', 'pared'),
  c('look', 'caja fuerte'),
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

