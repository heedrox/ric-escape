const aRoom = (id, name, synonyms, description) =>
  ({ id, name, synonyms, description });
const anItem = (id, name, synonyms, description, location, pickable, pickingResponse) =>
  ({ id, name, synonyms, description, location, pickable, pickingResponse });
const anUsage = (items, response, onlyOnce) =>
  ({ items, response, onlyOnce });
const anUnlockingAction = (response, lock) => ({ isUnlockingAction: true, response, lock });
const aPickingAction = (response, itemId) => ({ isPickingAction: true, response, itemId });
const aLockedDestination = (roomId, lock) => ({ isLockedDestination: true, roomId, lock });
const aCondDesc = (condition, description) => ({ conditional: true, condition, description });

exports.data = {
  sentences: {
    help: 'El único que puede ayudarte soy yo, RIC. Me puedes dar las siguientes instrucciones: Mirar, Usar, Ir, Coger e Inventario. Nos quedan {time} para estrellarnos.',
    fallback: 'No te entiendo. Di Ayuda si necesitas ayuda. Nos quedan {time} para estrellarnos.',
    destinations: 'Desde aquí puedo ir a: {destinations}',
    'destination-unknown': 'No sé ir al sitio {destination}.',
    'remaining-time': '{minutes} minutos y {seconds} segundos',
    'item-not-in-location': 'No encuentro o veo ese objeto.',
    'item-notseen': 'No veo el objeto {name} por aquí',
    'item-unknown': 'No te he entendido qué quieres que me lleve.',
    'item-pickedup': 'Me llevo el objeto {name} conmigo.',
    'item-notpickable': 'No puedo llevarme el objeto {name} conmigo',
    'item-alreadyinventory': 'Ya llevo conmigo el objeto {name}',
    'item-alreadypicked': 'Ya me llevé el objeto {name}.',
    'use-noarg': 'Especifíca que objeto u objetos quieres que use. Por ejemplo: usar objeto, o usar objeto con objeto.',
    'use-cant': 'No puedo usar el objeto {item}',
    'use-canttwo': 'No puedo usar los objetos {item1} y {item2} entre sí',
    'use-onlyonce': 'Ya utilicé ese objeto. No puedo usarlo otra vez.',
    'use-onlyonce-two': 'Ya utilicé esos objetos. No puedo usarlos otra vez.',
    inventory: 'Llevo los siguientes objetos conmigo: {items}',
    'inventory-nothing': 'No llevo nada encima.',
    bye: 'Vale. Será un placer morir contigo. Adiós.',
  },
  init: {
    roomId: 'sala-mandos',
    welcome: [
      '¡Hola! Soy RIC',
      '¿Oh, Estás despierto? No deberías estarlo... Déjame que investigue qué ha pasado... De mientras te cuento que yo soy RIC, tu Remoto Interfaz al Córtex. No, no abras los ojos. No puedes ver, no puedes andar, no puedes interactuar con tu entorno porque estás dormido en tu habitación... Vaya, veo que un fallo en el sistema te ha despertado cuando eso no debería haber pasado. Bueno, supongo que ya da igual.',
      'Tras el proceso biológico de hibernación, es normal que no te acuerdes. La nave va rumbo a una estrella con la que colisionará dentro de 30 minutos. ¿Por qué? Ya no importa. ¿Quién es responsable de esto? Ya no importa. Dentro de 30 minutos nada importará. Es inútil que te resistas. Si quieres, puedes darme órdenes, ya que me creaste para obedecerte. Pero ya todo es en vano. Tú y los 2000 pasajeros de esta nave, debéis morir dentro de 30 minutos. Di "Ayuda" para lanzarme órdenes.',
    ],
  },
  rooms: [
    aRoom('sala-mandos', 'Sala de mandos', [], 'Estoy en la sala de mandos de la nave espacial. Desde aquí puedo ver un ordenador, el diario de abordo y las ventanas al exterior.'),
    aRoom('pasillo-norte', 'Pasillo norte', [], 'Estoy en el pasillo norte de la nave espacial. Puedo ver televisores en las paredes, muebles modernos y la entrada al comedor.'),
    aRoom('pasillo-central', 'Pasillo central', [], 'Estoy en el pasillo central de la nave espacial. Puedo ver televisores en las paredes, muebles modernos y la entrada a la biblioteca.'),
    aRoom('comedor', 'Comedor', [], [
      aCondDesc('!picked:comedor-cartera', 'Estoy en el comedor de la nave espacial. Puedo ver mesas, sillas, comida varia y varios utensilios que no entiendo para qué funcionan. También veo algo en el suelo.'),
      aCondDesc('default', 'Estoy en el comedor de la nave espacial. Puedo ver mesas, sillas, comida varia y varios utensilios que no entiendo para qué funcionan.'),
    ]),
    aRoom('biblioteca', 'Biblioteca', [], 'Estoy en la biblioteca de la nave espacial. Puedo ver muchos libros, pero los que te pueden interesar son: libros sobre robótica, libros sobre navegación, libros sobre planetas y libros sobre biologías.'),
    aRoom('pasillo-sur', 'Pasillo sur', [], 'Estoy en el pasillo sur de la nave espacial. Puedo ver televisores en las paredes, muebles modernos y la entrada a las habitaciones.'),
    aRoom('habitacion-108', 'Habitación 108', ['Mi habitación'], 'Estoy en la habitación 108, que es tu habitación. Te puedo ver a ti durmiendo sobre la cama, una mesilla, y un cuadro personal en la pared'),
  ],
  map: {
    'sala-mandos': ['pasillo-norte'],
    'pasillo-norte': ['sala-mandos', 'comedor', 'pasillo-central'],
    'pasillo-central': ['biblioteca', 'pasillo-norte', 'pasillo-sur'],
    'pasillo-sur': [aLockedDestination('habitacion-108', 'hab108'), 'pasillo-central'],
    biblioteca: ['pasillo-central'],
    comedor: ['pasillo-norte'],
    'habitacion-108': ['pasillo-sur'],
  },
  items: [
    anItem('sala-mandos-ventanas', 'Ventanas al exterior', ['ventana al exterior', 'ventana', 'ventanas', 'ventanas exteriores'], 'Son las ventanas al exterior. Desde aquí puedes ver planetas y estrellas. Una de esas estrellas está peligrosamente cerca.', 'sala-mandos', false),
    anItem('sala-mandos-ordenador', 'Ordenador de navegación', ['ordenador', 'navegación', 'ordenador para navegar', 'mandos de navegación'], 'Es el ordenador de navegación. Si no hacemos nada, nos estrellaremos contra esa estrella.', 'sala-mandos', false),
    anItem('sala-mandos-diario', 'Diario de abordo', ['diario'], 'Es el diario de abordo. Si quieres que interactúe con él, di "Usar diario".', 'sala-mandos', false),
    anItem('pasnor-pared', 'Paredes', ['paredes del pasillo norte', 'paredes', 'pared'], 'Son las paredes del pasillo. No veo nada especial.', 'pasillo-norte', false),
    anItem('pasnor-muebles', 'Muebles', ['muebles del pasillo norte', 'muebles', 'mueble', 'mueble del pasillo', 'mueble de pasillo'], 'Hay algunos muebles. Demasiado complejos y modernos para ti.', 'pasillo-norte', false),
    anItem('pasnor-televisor', 'Televisores', ['televisores del pasillo norte', 'televisor', 'televisión', 'televisor del pasillo', 'televisor del pasillo norte'], 'Son televisores que muestran números. No sé interpretarlos.', 'pasillo-norte', false),
    anItem('pascen-pared', 'Paredes del pasillo central', ['paredes', 'pared'], 'Son las paredes del pasillo. No veo nada especial.', 'pasillo-central', false),
    anItem('pascen-muebles', 'Muebles del pasillo central', ['muebles', 'mueble', 'mueble del pasillo', 'mueble de pasillo'], 'Hay algunos muebles. Demasiado complejos y modernos para ti.', 'pasillo-central', false),
    anItem('pascen-televisor', 'Televisores', ['televisor', 'televisión', 'televisor del pasillo', 'televisor del pasillo norte'], 'Son televisores que muestran números. No sé interpretarlos.', 'pasillo-central', false),
    anItem('passur-pared', 'Paredes del pasillo sur', ['paredes', 'pared'], 'Son las paredes del pasillo sur. No veo nada especial.', 'pasillo-sur', false),
    anItem('passur-muebles', 'Muebles del pasillo sur', ['muebles', 'mueble', 'mueble del pasillo', 'mueble de pasillo'], 'Hay algunos muebles. Demasiado complejos y modernos para ti.', 'pasillo-sur', false),
    anItem('passur-televisor', 'Televisores', ['televisor', 'televisión', 'televisor del pasillo', 'televisor del pasillo norte'], 'Son televisores que muestran números. No sé interpretarlos.', 'pasillo-sur', false),
    anItem('comedor-suelo', 'Suelo del comedor', ['suelo', 'suelo en el comedor'],
      [
        aCondDesc('!picked:comedor-cartera', 'Veo una cartera en el suelo. Parece la tuya.'),
        aCondDesc('else', 'Es el suelo. No veo nada más.'),
      ], 'comedor', false),
    anItem('comedor-cartera', 'Cartera', ['monedero', 'billetera'], 'Es una cartera. Creo que es la tuya.', 'comedor', true),
    anItem('comedor-mesas', 'Mesas del comedor', ['mesas', 'mesa', 'mesa del comedor'], 'Son las mesas del comedor. No veo nada interesante.', 'comedor', false),
    anItem('comedor-sillas', 'Sillas en el comedor', ['sillas', 'silla', 'silla del comedor', 'sillas del comedor'], 'Son las sillas del comedor. No veo nada interesante.', 'comedor', false),
    anItem('comedor-comida', 'Mucha comida', ['comida', 'comida varia', 'comidas varias', 'comidas', 'restos de comida'], 'Aquí hay mucha comida. Demasiada. Dime qué quieres que coja exáctamente.', 'comedor', false),
    anItem('comedor-utensilios', 'Muchos utensilios', ['utensilios', 'utensilios varios', 'electrodomésticos', 'aparatos de cocina', 'aparatos'], 'Aquí hay muchísimos aparatos. Si quieres que use alguno, dime cuál exáctamente.', 'comedor', false),
    anItem('combinacion-4815', 'Combinación 4815', ['combinación 4 8 1 5', 'combinación', 'combinación cuatro mil ochocientos quince'], 'Es la combinación que tenías apuntada en la cartera.', '', true),
    anItem('hab108-cama', 'Cama', ['mi', 'yo', 'encima de la cama'], 'Encima de la cama estás tú. No te quiero despertar, pues tienes que morir.', 'habitacion-108', false),
    anItem('hab108-mesilla', 'Mesilla', ['mesa', 'mesa de noche', 'mesas'], 'Encima de la mesa parece que hay un pequeño diario personal.', 'habitacion-108', false),
    anItem('hab108-diario', 'Diario', ['diario personal', 'libro', 'librillo', 'mi diario'], 'Es tu diario personal. Si quieres que mire dentro, di "Usar diario"', 'habitacion-108', false),
    anItem('hab108-pared', 'Pared de la habitación', ['pared', 'pared en habitación', 'pared de habitación'], [
      aCondDesc('picked:hab108-cuadro', 'En la pared hay una caja fuerte.'),
      aCondDesc('else', 'En la pared hay cuadro muy bonito.'),
    ], 'habitacion-108', false),
    anItem('hab108-cuadro', 'Cuadro', ['cuadro de la pared', 'cuadro de pared', 'cuadro en la pared', 'cuadro en pared'], 'Un cuadro de tu hogar natal en Newcomb.', 'habitacion-108', true, 'Veo que al llevarme el cuadro, se ha quedado en la pared una caja fuerte al descubierto.'),
    anItem('hab108-cajafuerte', 'Caja fuerte', ['caja en pared','caja de la pared', 'caja'], 'Es tu caja fuerte. Para abrirla parece que necesitas un número de 4 cifras.', 'habitacion-108', false),
    anItem('hab108-aparato', 'Aparato extraño', ['aparato', 'aparato para reprogramar robots', 'aparato de reprogramar', 'aparato para reprogramación' ,'aparato para reprogramar'], 'Es un aparato para reprogramar robots. Confieso que lo escondí yo en esa caja fuerte porque me da miedo.', 'habitacion-108', false),
    anItem('ric', 'RIC', ['robot', 'robot ric', 'ric el robot', 'robot maléfico', 'ric and moriarty', 'ric modificado', 'robot modificado'], 'Soy RIC, el Remoto Interfaz al Córtex. Gracias a mi, puedes interactuar y andar en esta nave, aunque realmente estás tendido en tu habitación.', null, false),

  ],
  usages: [
    anUsage('sala-mandos-diario', [
      'Los primeros minutos del diario te muestran a tí en el comedor. Se ve cómo se te cae la cartera al suelo.',
      anUnlockingAction('Los siguientes minutos del diario muestran cómo te diriges hacia tu habitación, la habitación número 108.', 'hab108'),
      'Los últimos minutos del diario me muestran a mi, RIC, forzando el modo de hibernación, y haciendo que todos cayerais dormidos. También se me ve modificando las coordenadas para dirigir la nave hacia la estrella. Lo hice por vuestro bien... ',
    ], false),
    anUsage('ric', [
      'Ya me estás usando. Aunque deberías estar dormido, ya que todos debéis morir.',
    ], false),
    anUsage('comedor-cartera', [
      aPickingAction('Veo que dentro de la cartera hay un papel, en el que está escrito la combinación 4815. Vaya seguridad, ¿guardando números secretos en la cartera? Bueno, me lo llevo por si es de utilidad.', 'combinacion-4815'),
    ], true),
    anUsage(['combinacion-4815', 'hab108-cajafuerte'], [
      aPickingAction('Clic. Sí, la caja se ha abierto. Hay un aparato extraño dentro de la caja fuerte. Me lo llevo.', 'hab108-aparato'),
    ], true),
  ],
};
