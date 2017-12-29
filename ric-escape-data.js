const aRoom = (id, name, description) => ({ id, name, description });

exports.data = {
  init: {
    roomId: 'sala-mandos',
  },
  rooms: [
    aRoom('sala-mandos', 'Sala de mandos', 'Estoy en la sala de mandos de la nave espacial. Desde aquí puedo ver un ordenador, el diario de abordo y las ventanas al exterior.'),
    aRoom('pasillo-norte', 'Pasillo norte', 'Estoy en el pasillo norte de la nave espacial. Puedo ver televisores en las paredes, muebles modernos y la entrada al comedor.'),
    aRoom('pasillo-central', 'Pasillo central', 'Estoy en el pasillo central de la nave espacial. Puedo ver televisores en las paredes, muebles modernos y la entrada a la biblioteca.'),
    aRoom('comedor', 'Comedor', 'Estoy en el comedor de la nave espacial. Puedo ver mesas, sillas, comida varia y varios utensilios que no entiendo para qué funcionan.'),
    aRoom('biblioteca', 'Biblioteca', 'Estoy en la biblioteca de la nave espacial. Puedo ver muchos libros, pero los que te pueden interesar son: libros sobre robótica, libros sobre navegación, libros sobre planetas y libros sobre biologías.'),
    aRoom('pasillo-sur', 'Pasillo sur', 'Estoy en el pasillo sur de la nave espacial. Puedo ver televisores en las paredes, muebles modernos y la entrada a las habitaciones.'),
    aRoom('habitacion-108', 'Habitación 108', 'Estoy en la habitación 108, que es tu habitación. Te puedo ver a ti durmiendo sobre la cama, una mesilla, y un cuadro personal en la pared'),
  ],
  map: {
    'sala-mandos': ['pasillo-norte'],
    'pasillo-norte': ['sala-mandos', 'comedor', 'pasillo-central'],
    'pasillo-central': ['biblioteca', 'pasillo-norte', 'pasillo-sur'],
    'pasillo-sur': ['habitacion-108', 'pasillo-central'],
    biblioteca: ['pasillo-central'],
    comedor: ['pasillo-norte'],
    'habitacion-108': ['pasillo-sur'],
  },
};
