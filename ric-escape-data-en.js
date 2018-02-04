const aRoom = (id, name, synonyms, description) =>
  ({ id, name, synonyms, description });
const anItem = (id, name, synonyms, description, location, pickable, pickingResponse) =>
  ({ id, name, synonyms, description, location, pickable, pickingResponse });
const anUsage = (items, response, onlyOnce) =>
  ({ items, response, onlyOnce });
const anUnlockingAction = (response, lock) => ({ isUnlockingAction: true, response, lock });
const aPickingAction = (response, itemId) => ({ isPickingAction: true, response, itemId });
const aConditionalResponse = conditions => ({ isConditional: true, conditions });
const aLockedDestination = (roomId, lock) => ({ isLockedDestination: true, roomId, lock });
const aCondDesc = (condition, description) => ({ conditional: true, condition, description });
const aCondDescUsage = (consumesObjects, condition, description) =>
  ({ conditional: true, consumesObjects, condition, description });
const theEndingScene = description => ({ isEndingScene: true, description });

exports.data = {
  sentences: {
    help: 'You can ask me to: Look, Use, Walk, Pick up and Inventory. Here is a map also. We have {time} left to die. What do you want me to do?',
    'help-no-screen': 'You can ask me to: Look, Use, Walk, Pick up and Inventory. Here is a map: Here is a map: https://www.ric-escape.com/ric-escape-map.jpg. We have {time} left to die. What do you want me to do?',
    fallback: 'I don\'t understand. Say Help if you need help. We have {time} left to die. What do you want me to do?',
    destinations: 'From here I can go to: {destinations}. What next?',
    'destination-unknown': 'I do not know how to go to {destination}. What next?',
    'map-alt': 'A map with control room, north hall, dining room, central hall, library, south hall and compartments',
    'remaining-time': '{minutes} minutes and {seconds} seconds',
    'ending-remaining-time': 'You had left {timeLeft}',
    'item-not-in-location': 'I do not find or see that item. What next?',
    'item-notseen': 'I do not see the item {name} around here. What next?',
    'item-unknown': 'I did not get what do you want me to pick up. What next?',
    'item-pickedup': 'I will take the {name} with me. What next?',
    'item-notpickable': 'I can\'t take the {name} with me. What next?',
    'item-alreadyinventory': 'I am already carrying the item {name} with me. What next?',
    'item-alreadypicked': 'I already picked up this item {name}. What next?',
    'use-noarg': 'Specify the item or items that you want me to use. For example: use item, or use item with another item. What next?',
    'use-cant': 'I can\'t use the item {item}. What next?',
    'use-canttwo': 'I can\'t use the items {item1} and {item2} with each other. What next?',
    'use-onlyonce': 'I alredy used that item; i cannot use it again. What next?',
    'use-onlyonce-two': 'I already used those items together. I cannot use them again. What next?',
    inventory: 'I\'m carrying these items: {items}. What next?',
    'inventory-nothing': 'I am carrying nothing. What next?',
    bye: 'Ok. See you in another life. Bye! I really hope you enjoyed this game. If you did not, please do contact heedrox@gmail.com to let him know what you did not, pretty please. He did this so you really had fun. He would love to know from you and get some feedback, really.',
    'end-timeover': 'There is no time left. We will die. It has been a pleasure to work with you. See you in another life, brother. ',
    'changed-language': 'Ok, I will speak in {lang} from now on. What next?',
    'changed-language-unknown': 'I do not know how to speak {lang}. I only can talk English and Spanish. What next?',

  },
  init: {
    roomId: 'sala-mandos',
    welcome: [
      'Hello! I am RIC. I really hope we get some fun together! What do you want me to do?',
      'Hello! I am RIC, your Remote Interface to Consciousness, lets have some fun! But, you are awake? You should not be. Let me find out what happened. You are slept in your room. I see that a failure in the system woke you up. Well, I guess nothing matters now, we will die. What do you want me to do?',
      'After the hibernation process, I understand you do not remember. This spaceship is going towards that star, and will collide in 35 minutes. Why? It does not matter anymore. Who is responsible of this? It does not matter anymore. In 35 minutes, nothing will matter. You can ask me to do anything, as you created me to obbey. But everything is in vain. You and the 2000 passengers in this ship will die in 35 minutes. Say "Help" if you want me to do anything.',
    ],
  },
  rooms: [
    aRoom('sala-mandos', 'Control room', ['controls room', 'controls'], 'I am at the control room of this space ship. From here I can see a computer, the onboard diary and the windows to outside. What next?'),
    aRoom('pasillo-norte', 'North hall', ['north hole', 'north pole', 'northhall', 'northall', 'hall of north', 'north'], 'I am at the north hall of this space ship. I can see different TVs on the walls, some modern furniture, the entrance to the dining room and to the controls room. What next?'),
    aRoom('pasillo-central', 'Central hall', ['centrall hall', 'central hole', 'central pole', 'central', 'center'], 'I am at the central hall of this space ship. I can see different TVs on the wallks, some modern furniture, the entrance to the library and to north and south halls. What next?'),
    aRoom('comedor', 'Dining Room', ['the dining room', 'diner', 'dining hall', 'canteen'], [
      aCondDesc('!picked:comedor-cartera', 'I am at the dining room of this space ship. I can see chairs, tables, some food and some appliances I do not understand. I can also see something on the floor also. What next?'),
      aCondDesc('default', 'I am at the dining room of this space ship. I can see chairs, tables, some food and some appliances I do not understand. What next?'),
    ]),
    aRoom('biblioteca', 'Library', [], 'I am at the library of this space ship. I can see many books, but these ones may be of interest: books on robotics, books on navigation and books on planets. What next?'),
    aRoom('pasillo-sur', 'South hall', ['south hole', 'south pole', 'south', 'southall'], 'I am at the south hall of this space ship. I can see TVs, some modern furniture, the entrance to compartments rooms and to central hall. What next?'),
    aRoom('habitacion-108', 'Compartment number 108', ['department 108', 'Compartment 108', 'compartment room 108', 'compartment number 108', 'room 108', 'room number 108', '108 compartment', '108 room'], 'I am at the compartment number 108, your room. I can see you sleeping on the bed, a bedside table, and a picture on the wall. What next?'),
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
    anItem('ric', 'RIC', ['yourself', 'you', 'rick', 'robot', 'robot ric', 'robot rick', 'rick the robot', 'ric the robot', 'rick el robot', 'ric el robot', 'robot maléfico', 'ric and moriarty', 'ric modificado', 'robot modificado'], 'I am RIC, your Remote Interface to Consciousness. Through me you can interact with this ship, while you are laying on your bed. What next?', null, false),
    anItem('sala-mandos-ventanas', 'windows', ['window', 'window to the outside', 'outside windows', 'windows to outside', 'windows to the outside', 'outside', 'outside the window'], 'These are the windows to the ouside. You can see planets and stars from here, and one of those stars is really close. What next?', 'sala-mandos', false),
    anItem('sala-mandos-ordenador', 'Navigation computer', ['the computer', 'computer', 'navigation', 'control computer', 'control'], 'It is the navigation computer. If we do nothing, we will collide into that star. What next?', 'sala-mandos', false),
    anItem('sala-mandos-diario', 'Onboard diary', ['on board diary', 'the diary', 'diary', 'theory'], 'It is the onboard diary. If you want me to interact with it, say "Use diary". What next?', 'sala-mandos', false),
    anItem('pasnor-pared', 'Walls', ['walls on north hall', 'Walls on halls', 'wall', 'wall on the hall'], 'These are the walls on the hall. Nothing out of the ordinary. What next?', 'pasillo-norte', false),
    anItem('pasnor-muebles', 'Furniture', ['furniture on the halls', 'furniture on the hall', 'furniture on hall'], 'There is some furniture. Everything is too complex and futuristic for you. What next?', 'pasillo-norte', false),
    anItem('pasnor-televisor', 'TVs', ['televisions', 'TV', 'tvs', 'television'], 'There is a television that shows numbers. I do not know how to read it, but I do not think it is important. What next?', 'pasillo-norte', false),
    anItem('pascen-pared', 'Walls', ['walls on central hall', 'Walls on halls', 'wall', 'wall on the hall'], 'These are the walls on the hall. Nothing out of the ordinary. What next?', 'pasillo-central', false),
    anItem('pascen-muebles', 'Furniture', ['furniture of central hall', 'furniture on the halls', 'furniture on the hall', 'furniture on hall'], 'There is some furniture. Everything is too complex and futuristic for you. What next?', 'pasillo-central', false),
    anItem('pascen-televisor', 'TVs', ['televisions', 'TV', 'tvs', 'television'], 'There is a television that shows numbers. I do not know how to read it, but I do not think it is important. What next?', 'pasillo-central', false),
    anItem('passur-pared', 'Walls', ['walls on south hall', 'Walls on halls', 'wall', 'wall on the hall'], 'These are the walls on the hall. Nothing out of the ordinary. What next?', 'pasillo-sur', false),
    anItem('passur-muebles', 'Furniture', ['furniture of south hall', 'furniture on the halls', 'furniture on the hall', 'furniture on hall'], 'There is some furniture. Everything is too complex and futuristic for you. What next?', 'pasillo-sur', false),
    anItem('passur-televisor', 'TVs', ['televisions', 'TV', 'tvs', 'television'], 'There is a television that shows numbers. I do not know how to read it, but I do not think it is important. What next?', 'pasillo-sur', false),
    anItem('comedor-suelo', 'Floor from the dining room', ['floor', 'floor of the room', 'floor on the room', 'floor from the room', 'the floor'],
      [
        aCondDesc('!picked:comedor-cartera', 'I see a wallet on the floor. It looks like it is yours. What next?'),
        aCondDesc('else', 'It is the floor. I see nothing. What next?'),
      ], 'comedor', false),
    anItem('comedor-cartera', 'Wallet', ['item on the floor', 'purse', 'bag', 'briefcase'], 'It is a wallet. I think it is yours. What next?', 'comedor', true),
    anItem('comedor-mesas', 'Tables from the dining room', ['tables', 'table', 'dining table'], 'These are the tables of the dining room. Nothing out of the ordinary. What next?', 'comedor', false),
    anItem('comedor-sillas', 'Chairs from the dining room', ['chairs', 'chair', 'dining chair', 'sitting chair', 'stools', 'stool'], 'These are sitting chairs. Nothing special. What next?', 'comedor', false),
    anItem('comedor-comida', 'Lot\'s of food', ['food', 'foods', 'several food', 'several foods'], 'There is a lot of food. Too many. Tell me what you want me to pick up specifically. What next?', 'comedor', false),
    anItem('comedor-utensilios', 'Lot\'s of home appliances', ['appliances', 'home appliances', 'tools', 'kitchen tools', 'tool'], 'There are lot of home appliances here. Tell me which one you want me to use specifically, as I see too many. What next?', 'comedor', false),
    anItem('comedor-gasotron', 'Gasotron', ['gasit run', 'gas station', 'gasotrom'], 'A gasotron allows to dilute components and molecules of a food into the air. What next?', 'comedor', true),
    anItem('comedor-zanahoria', 'Carrot', ['carrots'], 'Carrots, food rich in beta carotene. What should I do?', 'comedor', true),
    anItem('combinacion-4815', '4815 number', ['4815', 'number 4815', 'combination 4815', '4815 combination', 'combination', '4815 code', 'code 4815'], 'It is the combination that you had in your wallet. What next?', '', true),
    anItem('hab108-cama', 'Bed', ['myself', 'me', 'to me', 'on bed', 'over the bed'], 'I see yourself lying on the bed. I do not want to wake you up, as you need to die. What next?', 'habitacion-108', false),
    anItem('hab108-mesilla', 'Bedside table', ['table', 'table close to bed', 'bed table', 'little table'], 'There is a little personal diary on this table. What next?', 'habitacion-108', false),
    anItem('hab108-diario', 'Diary', ['personal diary', 'little personal diary', 'book', 'my diary', 'my personal diary'], 'It is you personal diary. If you want me to read it to you, say "Use diary". What next?', 'habitacion-108', false),
    anItem('hab108-pared', 'Room wall', ['wall', 'wall of the room', 'wall of room'], [
      aCondDesc('picked:hab108-cuadro', 'There is a safety box on the wall. What should I do?'),
      aCondDesc('else', 'There is a nice picture on the wall. What should I do?'),
    ], 'habitacion-108', false),
    anItem('hab108-cuadro', 'Picture', ['picture on the wall', 'wall picture', 'painting', 'painting on the wall', 'wall painting'], 'A painting of Newcomb, your home.', 'habitacion-108', true, 'When I picked it up, I revealed a safety box on the wall. What do you want me to do?'),
    anItem('hab108-cajafuerte', 'Safety box', ['box', 'safety', 'safetybox', 'safebox', 'safe box'], 'It is your safety box. It looks like you need a 4 digit combination to open it. What next?', 'habitacion-108', false),
    anItem('hab108-aparato', 'Strange device', ['device', 'device to program robots', 'robot device', 'devices', 'reprogramming device'], 'It is a device to reprogram robots. I must confess I hid it because I got scared of it. What next?', 'habitacion-108', false),
    anItem('hab108-librarykey', 'Key', ['little key', 'small key'], 'It is a small key. What next?', 'habitacion-108', false),
    anItem('biblio-libros', 'Books', ['book'], 'There are lots of books. The ones that may be interesting are: books on navigation, books on robotics and books on planets. What next?', 'biblioteca', false),
    anItem('biblio-librorobots', 'Books on robotics', ['robotic handbook', 'book robotics', 'book robotic', 'robotic book', 'robotic books', 'books on robotic', 'books on robots', 'robots books', 'robot books', 'robot book'], 'There are lots of books on robotics. I see one about programming a RIC model like me. It is called "RIC models". What next?', 'biblioteca', false),
    anItem('biblio-libroric', 'Ric Models Book', ['rick models', 'ric models', 'rick model book', 'rick models book', 'ric model book', 'book on ric', 'book on rick', 'book on ric models', 'books on ric model', 'book on rick models', 'book on ricks models', 'rick model', 'rick models', 'rick book'], 'It is the book "RIC models". Say "Use RIC models book" if you want me to read it. What next?', 'biblioteca', false),
    anItem('codigo-1893', 'code 1893', ['good 1893', 'programming code 1893', 'programming code', 'code', '18 93', 'code 18 93', '1893', '1893 code', '1893 combination', 'number 1893', '1893 number', 'combination 1893'], 'It is the code to reprogram robots. Please do not look at me like that. What next?', 'biblioteca', false),
    anItem('biblio-libronavegacion', 'Books on navigation', ['book on navigation', 'book of navigation', 'navigation', 'navigation books', 'books about navigation', 'book on navigation', 'books of navigation', 'book for navigation', 'books for navigation'], 'There are plenty books on navigation. Driving this ship is easy. I can do that. Do not spend time reading these books. What next?', 'biblioteca', false),
    anItem('biblio-armario', 'Bookshelf', ['bookshelf', 'shelf', 'shelf with books', 'shell with books', 'bookshell', 'book shelf'], 'This shelf has lots of interesting books about planets. What do I do?', 'biblioteca', false),
    anItem('biblio-libroplanetas', 'Books on planets', ['book of planets', 'book of planet', 'books on planet', 'book on planets', 'planet books'], [
      aCondDesc('!unlocked:libroplanetas', 'There are plenty books on different planets. But these books are locked inside a bookshelf. Closed knowledge? (sorry for the bad joke). What next?'),
      aCondDesc('unlocked:libroplanetas', 'The bookshelf is open. Say "Use book about PLANET" so I read you a book about a specific planet. For example, "use book about Venus". What next?'),
    ], 'biblioteca', false),
    anItem('biblio-librovenus', 'Book about Venus', ['book about planet venus', 'book venus', 'venus book', 'venus'], [
      aCondDesc('!unlocked:libroplanetas', 'The bookshelf is closed. I do not reach this book. What next?'),
      aCondDesc('unlocked:libroplanetas', 'If you want me to read it, say "Use book on Venus". What next?'),
    ], 'biblioteca', false),
    anItem('biblio-librolexus', 'Book about Lexus', ['book lexus', 'lexus', 'lexus book', 'books about lexus', 'book about planet Lexus', 'Book about Lexus'], [
      aCondDesc('!unlocked:libroplanetas', 'The bookshelf is closed. I do not reach this book. What next?'),
      aCondDesc('unlocked:libroplanetas', 'If you want me to read it, say "Use book on Lexus". What next?'),
    ], 'biblioteca', false),

  ],
  usages: [
    anUsage('sala-mandos-diario', [
      'The first minutes of the diary show you in the dining room. I can see how you loose your wallet. There is more in this diary. What next?',
      anUnlockingAction('The following minutes of the diary show how you go to your room, the room number 108. There is more in this diary. What next?', 'hab108'),
      'The last minutes of the diary show how I am setting the hibernation mode to set you all to sleep. I can see myself changing the course of the ship through the navigation computer, so we collide into the star. Please, let me explain that I did this for the good of humanity. What next?',
    ], false),
    anUsage('ric', [
      'You already using me. Or you may want to use me with something? What next?',
    ], false),
    anUsage('comedor-cartera', [
      aPickingAction('I see a number inside the wallet. It is the combination 4815. Wow, great security keeping your secret numbers inside the wallet. I am taking it with me in case we need it. What next?', 'combinacion-4815'),
    ], true),
    anUsage(['combinacion-4815', 'hab108-cajafuerte'], [
      aPickingAction('Click. Yes, the safety box opened. There is a strange device inside the box. I am taking it with me. What next?', 'hab108-aparato'),
    ], true),
    anUsage('sala-mandos-ordenador', [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:ricmodified', 'I cannot change the course of this ship. My programming does not allow me to do that. It is the only way to save humanity. You must die. What next?'),
        aCondDescUsage(false, '!unlocked:humanitysaved', theEndingScene('Ok, I changed the course of this ship, and we will not die. Everything finishes here. Congratulations. You saved yourself, but did not save humanity. You could have done something else before this point. But nah, you rather saved yourself. You and your race are doomed. Sorry. Bye.')),
        aCondDescUsage(false, 'unlocked:humanitysaved', theEndingScene('Ok, I changed the course of this ship, and we will not die. Everything finishes here. Congratulations. You saved youself, and you also saved humanity, as the virus is dead by the action of the betacarotene. Congratulations! You did a great job! Hope we see each other again.')),
      ]),
    ], false),
    anUsage(['ric', 'sala-mandos-ordenador'], [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:ricmodified', 'I cannot change the course of this ship. My programming does not allow me to do that. It is the only way to save humanity. You must die. What next?'),
        aCondDescUsage(false, '!unlocked:humanitysaved', theEndingScene('Ok, I changed the course of this ship, and we will not die. Everything finishes here. Congratulations. You saved yourself, but did not save humanity. You could have done something else before this point. But nah, you rather saved yourself. You and your race are doomed. Sorry. Bye.')),
        aCondDescUsage(false, 'unlocked:humanitysaved', theEndingScene('Ok, I changed the course of this ship, and we will not die. Everything finishes here. Congratulations. You saved youself, and you also saved humanity, as the virus is dead by the action of the betacarotene. Congratulations! You did a great job! Hope we see each other again.')),
      ]),
    ], false),
    anUsage('biblio-libroric', [
      aPickingAction('Among many other things, it says that to reprogram a RIC robot you must use the code 1893. Interesting. I will take with me the "Code 1893". What next?', 'codigo-1893'),
    ], true),
    anUsage(['ric', 'codigo-1893'], [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:ricpending', 'Before using the code, you must use a device to reprogram RIC robots. What next?'),
        aCondDescUsage(true, 'unlocked:ricpending', anUnlockingAction('Oh, do you want me to use this device with me? I will loose all my memory... Bip. Bip. Ok, but please understand that I did it for the shake of humanity. You are all carrying a dangerous virus that, if you come back to the planet, you will extinguish the human race. Ok, resetting. 3, 2, 1. Hello, I am RIC, back to factory settings. What do you want me to do?', 'ricmodified')),
      ]),
    ], false),
    anUsage(['ric', 'hab108-aparato'], [
      anUnlockingAction('Ok. Now the device is asking for a code. Are you doing what I think you are doing? What next?', 'ricpending'),
    ], true),
    anUsage('hab108-diario', [
      'In the first pages of the diary, you write about how exciting it is this trip, to boldly go where no man has gone before. What next?',
      'In following pages, you talk about this strange planet we landed on. You write about how this member of the crew got infected from a virus. This virus infected soon the rest of the passengers. What next?',
      'The following pages, you write about how dangerous it would be if this virus got to Earth. In a moment of dispair, you write the next last words. What next?',
      'I read them to you literally: "I do not believe there is any cure. I tried but I failed. There is no time. I decided that the best thing to do is all of us to die. I programmed RIC to change the course to the closest star.". This is very tough. Do you want me to keep reading. What do I do?',
      'During last night, I gassed the crew with the Gasotron device from the dining room. I will sleep tonight. These are my last words. In a couple of days, nothing will matter anymore. And humanity will be saved. What next?',
      aConditionalResponse([
        aCondDescUsage(false, '!picked:hab108-librarykey', aPickingAction('In the last pages I see a small key with this message: "Lexus brought us death, so I lock it into the bookshelf". I am picking this key. What next?', 'hab108-librarykey')),
        aCondDescUsage(false, 'else', 'There is nothing else but "Lexus brought us death, so I lock into into the bookshelf". What next?'),
      ]),
    ], false),
    anUsage('hab108-librarykey', [
      'What do you want to use the key with? Tell me: "use key with item"',
    ], false),
    anUsage(['hab108-librarykey', 'biblio-armario'], [
      anUnlockingAction('Ok, the bookshelf is open. I can read the books on planets now. What next?', 'libroplanetas'),
    ], true),
    anUsage('biblio-librovenus', [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:libroplanetas', 'The bookshelf is not open. I cannot reach de book. What next?'),
        aCondDescUsage(false, 'unlocked:libroplanetas', 'How imaginative you are! Ok, let\'s see. Venus is a planet of 0.8 times the mass of Earth, and blah blah blah. What do you want all this for? What next?'),
      ]),
    ], false),
    anUsage('biblio-librolexus', [
      aConditionalResponse([
        aCondDescUsage(false, '!unlocked:libroplanetas', 'The bookshelf is not open. I cannot reach de book. What next?'),
        aCondDescUsage(false, 'unlocked:libroplanetas', 'There is a lot of information about the planet, but the most interesting thing is that the biological agents of the Lexus planet are highly toxic to betacarotene based food, as, for example, carrots. What next?'),
      ]),
    ], false),
    /* anUsage(['hab108-cuadro', 'biblio-librarykey'], [
      'The picture does not open, as it is quite loose.
       I think I could even take it with me. What next?',
    ], false), */
    anUsage(['comedor-gasotron', 'biblio-librarykey'], [
      'Gasotron does not need any key to be used. Use it with some specific food. What next?',
    ], false),
    anUsage(['comedor-gasotron', 'comedor-comida'], [
      'There is too much food I could use with the Gasotron. Tell me exactly what food do you want me to use it with. What next?',
    ], false),
    anUsage(['comedor-gasotron', 'comedor-zanahoria'], [
      anUnlockingAction('I am putting down the carrot into the Gasotron. I see a gas coming out of the Gasotron, and it dilutes into the air and to the compartments. Yes! I can guarantee now that this betacarotene has affected the organism of the passengers, and they are free of the virus. Well done! But do not celebrate yet, as we have to change course of this ship. Tell me quick, what next?', 'humanitysaved'),
    ], true),
  ],
};
