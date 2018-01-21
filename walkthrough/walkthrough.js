/* eslint-disable no-console */
require('./common.js');
const ricEscape = require('../index.js');

const c = (intent, arg) => ({ intent, arg });

const commands = [
  c('input.welcome', ''),
  c('input.unknown', ''),
  c('input.unknown', ''),
  c('look', ''),
  c('use', ['ordenador', 'robot']),
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
  c('use', ['caja fuerte', 'combinación 4815']),
  c('use', ['aparato', 'robot']),
  c('look', 'diario'),
  c('use', 'diario'),
  c('use', 'diario'),
  c('use', 'diario'),
  c('use', 'diario'),
  c('use', 'diario'),
  c('use', 'diario'),
  c('use', 'diario'),
  c('use', 'diario'),
  c('use', 'diario'),
  c('use', 'diario'),
  c('use', 'diario'),
  c('use', 'diario'),
  c('walk', 'pasillo sur'),
  c('walk', 'pasillo central'),
  c('walk', 'biblioteca'),
  c('look', 'libros'),
  c('look', 'libros sobre robótica'),
  c('look', 'libros sobre modelos ric'),
  c('use', 'libros sobre modelos ric'),
  c('use', ['robot', 'codigo']),
  c('look', 'libros sobre navegación'),
  c('look', 'libros sobre planetas'),
  c('look', 'libro sobre venus'),
  c('use', 'libro sobre venus'),
  c('look', 'armario'),
  c('use', ['llave', 'armario']),
  c('look', 'libros sobre planetas'),
  c('look', 'libro sobre venus'),
  c('use', 'libro sobre venus'),
  c('use', 'libro sobre lexus'),
  c('walk', 'pasillo central'),
  c('walk', 'pasillo norte'),
  c('walk', 'comedor'),
  c('pickup', 'gasotron'),
  c('pickup', 'zanahorias'),
  c('use', ['zanahorias', 'gasotron']),
  c('walk', 'pasillo norte'),
  c('walk', 'sala de mandos'),
  c('use', ['robot', 'ordenador']),
];

commands.forEach((command) => {
  console.log('\x1b[33mcommand', command, '\x1b[0m');
  const request = aDfaRequest()
    .withIntent(command.intent)
    .withArgs({ arg: command.arg })
    .withData(getDfaApp() ? getDfaApp().data : null)
    .build();

  ricEscape.ricEscape(request);

  if (getDfaApp().lastAsk) {
    console.log('RIC says: \x1b[31m', getDfaApp().lastAsk, '\x1b[0m');
    console.log('RICs data', getDfaApp().data);
  } else {
    console.log('\x1b[41m **** ENDING SCENE ***** \x1b[0m');
    console.log('RIC says: \x1b[31m', getDfaApp().lastTell, '\x1b[0m');
    console.log('RICs data', getDfaApp().data);
    console.log('\x1b[41m **** ENDING SCENE ***** \x1b[0m');
  }
});

