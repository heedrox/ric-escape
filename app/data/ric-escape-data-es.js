const { theEndingScene, anUnlockingAction, aPickingAction, aRoom, anItem, aLockedDestination, aCondDescUsage, aCondDesc, anUsage, aConditionalResponse } = require('scure').dsl;

exports.data = {
  sentences: {
    help: 'Me puedes dar las siguientes instrucciones: Mirar, Usar, Ir, Coger e Inventario. También te paso un mapa. Nos quedan {time} para estrellarnos. ¿Qué quieres que haga?',
    'help-no-screen': 'Me puedes dar las siguientes instrucciones: Mirar, Usar, Ir, Coger e Inventario. Aquí puedes ver un mapa: https://www.ric-escape.com/ric-escape-map.jpg . Nos quedan {time} para estrellarnos. ¿Qué quieres que haga?',
    fallback: 'No te entiendo. Di Ayuda si necesitas ayuda. Nos quedan {time} para estrellarnos. ¿Qué quieres que haga?',
    destinations: 'Desde aquí puedo ir a: {destinations}. ¿Qué quieres que haga?',
    'destination-unknown': 'No sé ir al sitio {destination}. ¿Qué quieres que haga?',
    'map-alt': 'Mapa con: sala de mandos, pasillo norte, comedor, pasillo central, biblioteca, pasillo sur y habitaciones',
    'remaining-time': '{minutes} minutos y {seconds} segundos',
    'ending-remaining-time': 'Quedaban {timeLeft}',
    'item-not-in-location': 'No encuentro o veo ese objeto. ¿Qué quieres que haga?',
    'item-notseen': 'No veo el objeto {name} por aquí. ¿Qué quieres que haga?',
    'item-unknown': 'No te he entendido qué quieres que me lleve. ¿Qué quieres que haga?',
    'item-pickedup': 'Me llevo el objeto {name} conmigo. ¿Qué quieres que haga?',
    'item-notpickable': 'No puedo llevarme el objeto {name} conmigo. ¿Qué quieres que haga?',
    'item-alreadyinventory': 'Ya llevo conmigo el objeto {name}. ¿Qué quieres que haga?',
    'item-alreadypicked': 'Ya me llevé el objeto {name}. ¿Qué quieres que haga?',
    'use-noarg': 'Especifíca que objeto u objetos quieres que use. Por ejemplo: usar objeto, o usar objeto con objeto. ¿Qué hago?',
    'use-cant': 'No puedo usar el objeto {item}. ¿Qué quieres que haga?',
    'use-canttwo': 'No puedo usar los objetos {item1} y {item2} entre sí. ¿Qué quieres que haga?',
    'use-onlyonce': 'Ya utilicé ese objeto. No puedo usarlo otra vez. ¿Qué quieres que haga?',
    'use-onlyonce-two': 'Ya utilicé esos objetos. No puedo usarlos otra vez. ¿Qué quieres que haga?',
    inventory: 'Llevo los siguientes objetos conmigo: {items}. ¿Qué quieres que haga?',
    'inventory-nothing': 'No llevo nada encima. ¿Qué quieres que haga?',
    bye: 'Vale. Será un placer morir contigo. Nos vemos en la otra vida, hermano. Adiós.',
    'end-timeover': 'Ya no hay tiempo. Vamos a estrellarnos. Ha sido un placer trabajar junto a ti. Te veo en la otra vida, hermano.',
    'changed-language': 'Ok, a partir de ahora hablaré en {lang}. ¿Qué quieres que haga?',
    'changed-language-unknown': 'No sé hablar el idioma {lang}. Solo sé hablar inglés y español. ¿Qué quieres hacer?',
    'final-question': '¿Qué hacemos ahora?',
  },
  init: {
    totalMinutes: 35,
    roomId: 'sala-mandos',
    welcome: [
      '¡Hola! Soy RIC. ¿Qué quieres que haga?',
      '¡Hola! Soy RIC, tu Remoto Interfaz de Conciencia. ¿Oh, Estás despierto? No deberías estarlo... Déjame que investigue qué ha pasado... No puedes ver, no puedes andar, no puedes interactuar con tu entorno porque estás dormido en tu habitación... Vaya, veo que un fallo en el sistema te ha despertado. Bueno, supongo que ya da igual, porque vamos a morir. ¿Qué quieres que haga?',
      'Tras el proceso biológico de hibernación, es normal que no te acuerdes. La nave va rumbo a una estrella con la que colisionará dentro de 35 minutos. ¿Por qué? Ya no importa. ¿Quién es responsable de esto? Ya no importa. Dentro de 35 minutos nada importará. Si quieres, puedes darme órdenes, ya que me creaste para obedecerte. Pero ya todo es en vano. Tú y los 2000 pasajeros de esta nave, debéis morir dentro de 35 minutos. Di "Ayuda" para lanzarme órdenes.',
    ],
  },
  rooms: [
    aRoom('sala-mandos', 'Sala de mandos', ['sala mandos'], 'Estoy en la sala de mandos de la nave espacial. Desde aquí puedo ver un ordenador, el diario de abordo y las ventanas al exterior. ¿Qué hago?'),
    aRoom('pasillo-norte', 'Pasillo norte', ['paseo norte', 'norte'], 'Estoy en el pasillo norte de la nave espacial. Puedo ver televisores en las paredes, muebles modernos y la entrada al comedor. ¿Qué hago?'),
    aRoom('pasillo-central', 'Pasillo central', ['paseo central', 'central'], 'Estoy en el pasillo central de la nave espacial. Puedo ver televisores en las paredes, muebles modernos y la entrada a la biblioteca. ¿Qué hago?'),
    aRoom('comedor', 'Comedor', [], [
      aCondDesc('!picked:comedor-cartera', 'Estoy en el comedor de la nave espacial. Puedo ver mesas, sillas, comida varia y varios utensilios que no entiendo para qué funcionan. También veo algo en el suelo. ¿Qué hago?'),
      aCondDesc('default', 'Estoy en el comedor de la nave espacial. Puedo ver mesas, sillas, comida varia y varios utensilios que no entiendo para qué funcionan. ¿Qué hago?'),
    ]),
    aRoom('biblioteca', 'Biblioteca', [], 'Estoy en la biblioteca de la nave espacial. Puedo ver muchos libros, pero los que te pueden interesar son: libros sobre robótica, libros sobre navegación y libros sobre planetas. ¿Qué hago?'),
    aRoom('pasillo-sur', 'Pasillo sur', ['paseo surf', 'paseo sur', 'pasillo surf', 'surf', 'sur'], 'Estoy en el pasillo sur de la nave espacial. Puedo ver televisores en las paredes, muebles modernos y la entrada a las habitaciones. ¿Qué hago?'),
    aRoom('habitacion-108', 'Habitación 108', ['Mi habitación'], 'Estoy en la habitación 108, que es tu habitación. Te puedo ver a ti durmiendo sobre la cama, una mesilla, y un cuadro personal en la pared. ¿Qué hago?'),
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
    anItem('ric', 'RIC', ['red', 'rick', 'robot', 'robot ric', 'robot rick', 'rick el robot', 'ric el robot', 'robot maléfico', 'ric and moriarty', 'ric modificado', 'robot modificado'], 'Soy RIC, el Remoto Interfaz de Conciencia. Gracias a mi, puedes interactuar y andar en esta nave, aunque realmente estás tendido en tu habitación. ¿Qué quieres que haga?', null, false),
    anItem('sala-mandos-ventanas', 'Ventanas al exterior', ['ventana al exterior', 'ventana', 'ventanas', 'ventanas exteriores', 'ventana fuera', 'ventana nave'], 'Son las ventanas al exterior. Desde aquí puedes ver planetas y estrellas. Una de esas estrellas está peligrosamente cerca. ¿Qué hago?', 'sala-mandos', false),
    anItem('sala-mandos-ordenador', 'Ordenador de navegación', ['ordenador', 'navegación', 'ordenador para navegar', 'mandos de navegación'], 'Es el ordenador de navegación. Si no hacemos nada, nos estrellaremos contra esa estrella. ¿Qué hago?', 'sala-mandos', false),
    anItem('sala-mandos-diario', 'Diario de abordo', ['diario'], 'Es el diario de abordo. Si quieres que interactúe con él, di "Usar diario". ¿Qué hago?', 'sala-mandos', false),
    anItem('pasnor-pared', 'Paredes', ['paredes del pasillo norte', 'paredes', 'pared'], 'Son las paredes del pasillo. No veo nada especial. ¿Qué hago?', 'pasillo-norte', false),
    anItem('pasnor-muebles', 'Muebles', ['muebles del pasillo norte', 'muebles', 'mueble', 'mueble del pasillo', 'mueble de pasillo'], 'Hay algunos muebles. Demasiado complejos y modernos para ti. ¿Qué hago?', 'pasillo-norte', false),
    anItem('pasnor-televisor', 'Televisores', ['televisores del pasillo norte', 'televisor', 'televisión', 'televisor del pasillo', 'televisor del pasillo norte', 'televisor en la pared', 'televisores en las paredes'], 'Son televisores que muestran números. No sé interpretarlos. ¿Qué hago?', 'pasillo-norte', false),
    anItem('pascen-pared', 'Paredes del pasillo central', ['paredes', 'pared'], 'Son las paredes del pasillo. No veo nada especial. ¿Qué hago?', 'pasillo-central', false),
    anItem('pascen-muebles', 'Muebles del pasillo central', ['muebles', 'mueble', 'mueble del pasillo', 'mueble de pasillo'], 'Hay algunos muebles. Demasiado complejos y modernos para ti. ¿Qué hago?', 'pasillo-central', false),
    anItem('pascen-televisor', 'Televisores', ['televisor', 'televisión', 'televisor del pasillo', 'televisor del pasillo norte', 'televisor en la pared', 'televisores en las paredes'], 'Son televisores que muestran números. No sé interpretarlos. ¿Qué hago?', 'pasillo-central', false),
    anItem('passur-pared', 'Paredes del pasillo sur', ['paredes', 'pared'], 'Son las paredes del pasillo sur. No veo nada especial. ¿Qué hago?', 'pasillo-sur', false),
    anItem('passur-muebles', 'Muebles del pasillo sur', ['muebles', 'mueble', 'mueble del pasillo', 'mueble de pasillo'], 'Hay algunos muebles. Demasiado complejos y modernos para ti. ¿Qué hago?', 'pasillo-sur', false),
    anItem('passur-televisor', 'Televisores', ['televisor', 'televisión', 'televisor del pasillo', 'televisor del pasillo norte', 'televisor en la pared', 'televisores en las paredes'], 'Son televisores que muestran números. No sé interpretarlos. ¿Qué hago?', 'pasillo-sur', false),
    anItem('comedor-suelo', 'Suelo del comedor', ['suelo', 'suelo en el comedor'],
      [
        aCondDesc('!picked:comedor-cartera', 'Veo una cartera en el suelo. Parece la tuya. ¿Qué hago?'),
        aCondDesc('else', 'Es el suelo. No veo nada más. ¿Qué hago?'),
      ], 'comedor', false),
    anItem('comedor-cartera', 'Cartera', ['monedero', 'billetera'], 'Es una cartera. Creo que es la tuya. ¿Qué hago?', 'comedor', true),
    anItem('comedor-mesas', 'Mesas del comedor', ['mesas', 'mesa', 'mesa del comedor'], 'Son las mesas del comedor. No veo nada interesante. ¿Qué hago?', 'comedor', false),
    anItem('comedor-sillas', 'Sillas en el comedor', ['sillas', 'silla', 'silla del comedor', 'sillas del comedor'], 'Son las sillas del comedor. No veo nada interesante. ¿Qué hago?', 'comedor', false),
    anItem('comedor-comida', 'Mucha comida', ['comida', 'comida varia', 'comidas varias', 'comidas', 'restos de comida'], 'Aquí hay mucha comida. Demasiada. Dime qué quieres que coja exáctamente. ¿Qué hago?', 'comedor', false),
    anItem('comedor-utensilios', 'Muchos utensilios', ['utensilios', 'utensilios varios', 'electrodomésticos', 'aparatos de cocina'], 'Aquí hay muchísimos aparatos de cocina. Si quieres que use alguno, dime cuál exáctamente, ya que no me sé los nombres de los que hay. ¿Qué hago?', 'comedor', false),
    anItem('comedor-gasotron', 'Gasotrón', ['gato tron', 'gasotrom', 'gas o tron'], 'Un Gasotrón, que sirve para diluir en el aire un alimento. ¿Qué hago?', 'comedor', true),
    anItem('comedor-zanahoria', 'Zanahoria', ['zanaoria', 'zanahorias'], 'Zanahorias, alimentos ricos en betacarotenos. ¿Qué hago?', 'comedor', true),
    anItem('combinacion-4815', 'Combinación 4815', ['combinacion 4 8 15', '4815', 'combinación 4 8 1 5', 'combinación', 'combinación cuatro mil ochocientos quince'], 'Es la combinación que tenías apuntada en la cartera. ¿Qué hago?', '', true),
    anItem('hab108-cama', 'Cama', ['mi', 'yo', 'encima de la cama'], 'Encima de la cama estás tú. No te quiero despertar, pues tienes que morir. ¿Qué hago?', 'habitacion-108', false),
    anItem('hab108-mesilla', 'Mesilla', ['mesa', 'mesa de noche', 'mesas'], 'Encima de la mesa parece que hay un pequeño diario personal. ¿Qué hago?', 'habitacion-108', false),
    anItem('hab108-diario', 'Diario', ['diario personal', 'libro', 'librillo', 'mi diario'], 'Es tu diario personal. Si quieres que mire dentro, di "Usar diario". ¿Qué hago?', 'habitacion-108', false),
    anItem('hab108-pared', 'Pared de la habitación', ['pared', 'pared en habitación', 'pared de habitación'], [
      aCondDesc('picked:hab108-cuadro', 'En la pared hay una caja fuerte. ¿Qué hago?'),
      aCondDesc('else', 'En la pared hay un cuadro muy bonito. ¿Qué hago?'),
    ], 'habitacion-108', false),
    anItem('hab108-cuadro', 'Cuadro', ['cuadro personal', 'cuadro de la pared', 'cuadro de pared', 'cuadro en la pared', 'cuadro en pared'], 'Un cuadro de tu hogar natal en Newcomb.', 'habitacion-108', true, 'Veo que al llevarme el cuadro, se ha quedado en la pared una caja fuerte al descubierto. ¿Qué hago?'),
    anItem('hab108-cajafuerte', 'Caja fuerte', ['caja en pared', 'caja de la pared', 'caja'], 'Es tu caja fuerte. Para abrirla parece que necesitas un número de 4 cifras. ¿Qué hago?', 'habitacion-108', false),
    anItem('hab108-aparato', 'Aparato extraño', ['aparato', 'aparato para reprogramar robots', 'aparato de reprogramar', 'aparato para reprogramación', 'aparato para reprogramar', 'reprograma robot'], 'Es un aparato para reprogramar robots. Confieso que lo escondí yo en esa caja fuerte porque me da miedo. ¿Qué hago?', 'habitacion-108', false),
    anItem('hab108-librarykey', 'Llave', ['llave pequeña'], 'Es una llave pequeña. ¿Qué hago?', 'habitacion-108', false),
    anItem('biblio-libros', 'Libros', ['libro'], 'Aquí hay muchos libros. Los que más te pueden interesar son: libros sobre navegación, libros sobre robótica y libros sobre planetas. ¿Qué hago?', 'biblioteca', false),
    anItem('biblio-librorobots', 'Libros sobre robótica', ['libros de robots', 'libros robótica', 'libro robótica', 'libro de robótica', 'libros de robótica'], 'Son muchos libros sobre robótica. Veo uno que te puede interesar, sobre cómo se programa un modelo como el mío. Se titula "Modelos RIC". ¿Qué hago?', 'biblioteca', false),
    anItem('biblio-libroric', 'Libro Modelos RIC', ['modulos rick', 'libro modulos rick', 'libros sobre modelos ric', 'modelos ric', 'modelos rick', 'libro modelos rick', 'libro sobre modelo ric', 'libro modelo ric', 'libro modelo rick', 'libro modelo rick', 'libro modelo enric'], 'Es el libro de título "Modelos RIC". Di "Usar libro Modelos RIC" si quieres que te lo lea. ¿Qué hago?', 'biblioteca', false),
    anItem('codigo-1893', 'Código 1893', ['codigo', 'codigo mil ochocientos noventa y 3', 'código 1 8 9 3'], 'Es el código para reprogramar un robot RIC. No sé por qué me miras así. ¿Qué hago?', 'biblioteca', false),
    anItem('biblio-libronavegacion', 'Libros sobre navegación', ['navegación', 'libros navegación', 'libros sobre navegar', 'libro de navegación', 'libros de navegación'], 'Son muchos libros sobre navegación. Navegar esta nave es fácil. Yo puedo hacerlo. No te preocupes. ¿Y ahora?', 'biblioteca', false),
    anItem('biblio-armario', 'Armario de libros', ['armario', 'armario de libros sobre planetas', 'armario con libros de planetas', 'armario pequeño', 'armario cerrado'], 'El armario con los libros de planetas. ¿Qué hago?', 'biblioteca', false),
    anItem('biblio-libroplanetas', 'Libros sobre planetas', ['libros de planetas', 'libros planetas', 'libros de planeta'], [
      aCondDesc('!unlocked:libroplanetas', 'Son muchos libros sobre diferentes planetas. Están todos cerrados en un armario con llave. ¿Conocimiento compartimentado? Ja, ja, ja, perdona el chiste. ¿Qué hago?'),
      aCondDesc('unlocked:libroplanetas', 'El armario de los libros de planetas está abierto. Di "Usar libro sobre PLANETA" para que te lea un libro sobre un planeta en concreto. Por ejemplo, "libro sobre Venus". ¿Qué hago?'),
    ], 'biblioteca', false),
    anItem('biblio-librovenus', 'Libro sobre venus', ['libros sobre venus', 'libros sobre planeta venus', 'Libro sobre planeta venus', 'Libro de venus', 'Libro de planeta venus'], [
      aCondDesc('!unlocked:libroplanetas', 'El armario está cerrado. No puedo alcanzar el libro. ¿Qué hago?'),
      aCondDesc('unlocked:libroplanetas', 'Si quieres que lo lea di "Usar libro sobre Venus". ¿Qué hago?'),
    ], 'biblioteca', false),
    anItem('biblio-librolexus', 'Libro sobre Lexus', ['libros sobre lexus', 'libros sobre planeta lexus', 'libro de lexus', 'Libro sobre planeta lexus', 'Libro de lexus', 'Libro de planeta lexus'], [
      aCondDesc('!unlocked:libroplanetas', 'El armario está cerrado. No puedo alcanzar el libro. ¿Qué hago?'),
      aCondDesc('unlocked:libroplanetas', 'Si quieres que lo lea di "Usar libro sobre lexus". ¿Qué hago?'),
    ], 'biblioteca', false),

  ],
  usages: [
    anUsage('sala-mandos-diario', [
      'Los primeros minutos del diario te muestran a tí en el comedor. Se ve cómo se te cae la cartera al suelo. Veo que este diario tiene más información. ¿Qué quieres que haga?',
      anUnlockingAction('Los siguientes minutos del diario muestran cómo te diriges hacia tu habitación, la habitación número 108. Veo que este diario tiene más información. ¿Qué hago?', 'hab108'),
      'Los últimos minutos del diario me muestran a mi, RIC, forzando el modo de hibernación, y haciendo que todos cayerais dormidos. También se me ve modificando las coordenadas para dirigir la nave hacia la estrella. Lo hice por vuestro bien... ¿Qué quieres que haga?',
    ], false),
    anUsage('ric', [
      'Ya me estás usando. Aunque deberías estar dormido, ya que todos debéis morir. ¿Y bien?',
    ], false),
    anUsage('comedor-cartera', [
      aPickingAction('Veo que dentro de la cartera hay un papel, en el que está escrito la combinación 4815. Vaya seguridad, ¿guardando números secretos en la cartera? Bueno, me lo llevo por si es de utilidad. ¿Qué hago?', 'combinacion-4815'),
    ], true),
    anUsage(['combinacion-4815', 'hab108-cajafuerte'], [
      aPickingAction('Clic. Sí, la caja se ha abierto. Hay un aparato extraño dentro de la caja fuerte. Me lo llevo. ¿Qué hago?', 'hab108-aparato'),
    ], true),
    anUsage('sala-mandos-ordenador', [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:ricmodified', 'No puedo alterar el curso de navegación del ordenador. Mi programación no me deja hacerlo, ya que la única forma de salvar la humanidad es estrellarnos y morir. ¿Qué hago?'),
        aCondDescUsage(false, '!unlocked:humanitysaved', theEndingScene('Ok, he alterado el curso de navegación, ya no os estrellaréis. Todo termina aquí. Felicidades, has conseguido salvarte, pero no has salvado a la humanidad. Podías haber hecho algo diferente para llegar a este punto. Pero no, has preferido salvarte tú. Lo siento, pero tú y tu raza estáis abocados a la extinción. Adiós.')),
        aCondDescUsage(false, 'unlocked:humanitysaved', theEndingScene('He alterado el curso de navegación, ya no os estrellaréis. Y además, la humanidad está salvada, ya que el patógeno está muerto por efecto del betacaroteno. ¡Enhorabuena! Has hecho un trabajo excelente. Hasta la próxima.')),
      ]),
    ], false),
    anUsage(['ric', 'sala-mandos-ordenador'], [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:ricmodified', 'No puedo alterar el curso de navegación del ordenador. Mi programación no me deja hacerlo, ya que la única forma de salvar la humanidad es estrellarnos y morir. ¿Qué hago?'),
        aCondDescUsage(false, '!unlocked:humanitysaved', theEndingScene('Ok, he alterado el curso de navegación, ya no os estrellaréis. Todo termina aquí. Felicidades, has conseguido salvarte, pero no has salvado a la humanidad. Podías haber hecho algo diferente para llegar a este punto. Pero no, has preferido salvarte tú. Lo siento, pero tú y tu raza estáis abocados a la extinción. Adiós.')),
        aCondDescUsage(false, 'unlocked:humanitysaved', theEndingScene('He alterado el curso de navegación, ya no os estrellaréis. Y además, la humanidad está salvada, ya que el patógeno está muerto por efecto del betacaroteno. ¡Enhorabuena! Has hecho un trabajo excelente. Hasta la próxima.')),
      ]),
    ], false),
    anUsage('biblio-libroric', [
      aPickingAction('Entre otras muchas cosas, dice que para reprogramar un robot RIC se debe usar el código 1893. Me apunto "Código 1893" en mi inventario. ¿Qué hago?', 'codigo-1893'),
    ], true),
    anUsage(['ric', 'codigo-1893'], [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:ricpending', 'Antes de introducir el código se debe utilizar un aparato para ello. ¿Qué hago?'),
        aCondDescUsage(true, 'unlocked:ricpending', anUnlockingAction('Oh, ¿Quieres que use este aparato conmigo mismo? Si lo haces perderé toda mi memoria... Bip. Bip. Vale. Entiende que lo que hice fue por el bien de la humanidad. Todos los humanos de esta nave lleváis un virus altamente contagioso que, si volvéis a vuestro planeta, extinguiréis la raza humana. Por favor, vuelve a dormirte. Vale, ejecutando instrucción de reseteo. 3, 2, 1. Hola, soy RIC, reestablecido a mis valores de fábrica. ¿Qué quieres que haga?', 'ricmodified')),
      ]),
    ], false),
    anUsage(['ric', 'hab108-aparato'], [
      anUnlockingAction('Ok, utilizado. Ahora mi interfaz pide un código. ¿No estarás haciendo lo que creo que estás haciendo, verdad? ¿Qué quieres que haga?', 'ricpending'),
    ], true),
    anUsage('hab108-diario', [
      'Son las primeras páginas de tu diario. Hablas de lo ilusionante que es este viaje, de llegar osadamente a lugares donde ninguna otra persona ha llegado antes. ¿Qué hago?',
      'En las siguientes páginas hablas del planeta extraño al que llegamos. Indicas cómo alguien de la tripulación se infectó de un extraño virus. El virus rápidamente se contagió al resto de la tripulación. ¿Qué más hago?',
      'Las siguientes páginas hablan de lo preocupado que estabas porque dicho virus llegara a la tierra. Un momento de desesperación finalmente te lleva a escribir tus últimas páginas. ¿Qué más hago?',
      'Te las leo literalmente: "No creo que haya cura, lo he intentado pero no puedo más, ya no hay tiempo. Mi mente se revela. He decidido que es mejor que muramos. He programado a RIC para que dirija la nave hacia la estrella más cercana.". Es muy duro, ¿quieres que siga leyendo? ¿Qué más hago?',
      'Durante la pasada noche, he gaseado a la tripulación con el Gasotrón del comedor. Yo dormiré esta noche. Estas son mis últimas palabras. En un par de días, moriremos. Será lo mejor para salvar la humanidad. ¿Qué más hago?',
      aConditionalResponse([
        aCondDescUsage(false, '!picked:hab108-librarykey', aPickingAction('En las últimas páginas hay una llave con el siguiente mensaje: "Lexus nos ha traido la muerte, así encierro yo esta muerte". Recojo la llave. ¿Qué más hago?', 'hab108-librarykey')),
        aCondDescUsage(false, 'else', 'No hay nada más escrito a excepción de "Lexus nos ha traido la muerte, así encierro yo esta muerte". ¿Qué más hago?'),
      ]),
    ], false),
    anUsage('hab108-librarykey', [
      '¿Con qué quieres usar la llave? Di Usar llave con objeto',
    ], false),
    anUsage(['hab108-librarykey', 'biblio-armario'], [
      anUnlockingAction('Ok, armario abierto. Ya puedo llegar a los libros sobre planetas. ¿Qué más hago?', 'libroplanetas'),
    ], true),
    anUsage('biblio-librovenus', [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:libroplanetas', 'El armario está cerrado. No puedo alcanzar el libro. ¿Qué más hago?'),
        aCondDescUsage(false, 'unlocked:libroplanetas', '¿Qué poca imaginación no? A ver, Venus es un planeta de masa 0.8 veces que la tierra y bla bla bla. ¿Para qué quieres saber todo esto?'),
      ]),
    ], false),
    anUsage('biblio-librolexus', [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:libroplanetas', 'El armario está cerrado. No puedo alcanzar el libro. ¿Qué más hago?'),
        aCondDescUsage(false, 'unlocked:libroplanetas', 'Hay mucha información sobre el planeta, pero quizás esto te interese: Los agentes biológicos del planeta Lexus encuentran altamente tóxicos los alimentos basados en carotenos, como por ejemplo, la zanahoria. ¿Qué más hago?'),
      ]),
    ], false),
    /* anUsage('hab108-cuadro', [
      'No creo que tenga que USAR el cuadro,
      pero quizás me lo puedo llevar... ¿Qué hago?',
    ], false), */
    anUsage(['hab108-cuadro', 'biblio-librarykey'], [
      'El cuadro no tiene que abrirse, está suelto. Incluso creo que me lo puedo llevar. ¿Qué hago?',
    ], false),
    anUsage(['comedor-gasotron', 'biblio-librarykey'], [
      'El Gasotrón no necesita ninguna llave para ser usado. Úsalo con una comida específica. ¿Qué hago?',
    ], false),
    anUsage(['comedor-gasotron', 'comedor-comida'], [
      'Hay demasiada comida que puedo usar con el Gasotrón. Especifica exactamente la comida que tengo que usar. ¿Qué más hago?',
    ], false),
    anUsage(['comedor-gasotron', 'comedor-zanahoria'], [
      anUnlockingAction('Introduzco la zanahoria en el gasotrón. Veo que un gas sale del gasotrón y se diluye por la nave. Puedo garantizar que el caroteno de la zanahoria se ha introducido en el organismo de todos los pasajeros, incluyendo en el tuyo. ¡Estáis salvados! Pero no lo celebres, todavía tenemos que desviar esta nave. Dime, rápido, ¿Qué más hago?', 'humanitysaved'),
    ], true),
  ],
};
