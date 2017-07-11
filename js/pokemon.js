angular.module( 'pokeApp' ).service( 'pokemon', function() {

  var pokemon = [
    {
      name: 'bulbasaur',
      id: 1
    },
    {
      name: 'ivysaur',
      id: 2
    },
    {
      name: 'venusaur',
      id: 3
    },
    {
      name: 'charmander',
      id: 4
    },
    {
      name: 'charmeleon',
      id: 5
    },
    {
      name: 'charizard',
      id: 6,
    },
    {
      name: 'squirtle',
      id: 7,
    },
    {
      name: 'wartortle',
      id: 8,
    },
    {
      name: 'blastoise',
      id: 9,
    },
    {
      name: 'caterpie',
      id: 10,
    },
    {
      name: 'metapod',
      id: 11,
    },
    {
      name: 'butterfree',
      id: 12,
    },
    {
      name: 'weedle',
      id: 13,
    },
    {
      name: 'kakuna',
      id: 14,
    },
    {
      name: 'beedrill',
      id: 15,
    },
    {
      name: 'pidgey',
      id: 16,
    },
    {
      name: 'pidgeotto',
      id: 17,
    },
    {
      name: 'pidgeot',
      id: 18,
    },
    {
      name: 'rattata',
      id: 19,
    },
    {
      name: 'raticate',
      id: 20,
    },
    {
      name: 'spearow',
      id: 21,
    },
    {
      name: 'fearow',
      id: 22,
    },
    {
      name: 'ekans',
      id: 23,
    },
    {
      name: 'arbok',
      id: 24,
    },
    {
      name: 'pikachu',
      id: 25,
    },
    {
      name: 'raichu',
      id: 26,
    },
    {
      name: 'sandshrew',
      id: 27,
    },
    {
      name: 'sandslash',
      id: 28,
    },
    {
      name: 'nidoran-f',
      id: 29,
    },
    {
      name: 'nidorina',
      id: 30,
    },
    {
      name: 'nidoqueen',
      id: 31,
    },
    {
      name: 'nidoran-m',
      id: 32,
    },
    {
      name: 'nidorino',
      id: 33,
    },
    {
      name: 'nidoking',
      id: 34,
    },
    {
      name: 'clefairy',
      id: 35,
    },
    {
      name: 'clefable',
      id: 36,
    },
    {
      name: 'vulpix',
      id: 37,
    },
    {
      name: 'ninetales',
      id: 38,
    },
    {
      name: 'jigglypuff',
      id: 39,
    },
    {
      name: 'wigglytuff',
      id: 40,
    },
    {
      name: 'zubat',
      id: 41,
    },
    {
      name: 'golbat',
      id: 42,
    },
    {
      name: 'oddish',
      id: 43,
    },
    {
      name: 'gloom',
      id: 44,
    },
    {
      name: 'vileplume',
      id: 45,
    },
    {
      name: 'paras',
      id: 46,
    },
    {
      name: 'parasect',
      id: 47,
    },
    {
      name: 'venonat',
      id: 48,
    },
    {
      name: 'venomoth',
      id: 49,
    },
    {
      name: 'diglett',
      id: 50,
    },
    {
      name: 'dugtrio',
      id: 51,
    },
    {
      name: 'meowth',
      id: 52,
    },
    {
      name: 'persian',
      id: 53,
    },
    {
      name: 'psyduck',
      id: 54,
    },
    {
      name: 'golduck',
      id: 55,
    },
    {
      name: 'mankey',
      id: 56,
    },
    {
      name: 'primeape',
      id: 57,
    },
    {
      name: 'growlithe',
      id: 58,
    },
    {
      name: 'arcanine',
      id: 59,
    },
    {
      name: 'poliwag',
      id: 60,
    },
    {
      name: 'poliwhirl',
      id: 61,
    },
    {
      name: 'poliwrath',
      id: 62,
    },
    {
      name: 'abra',
      id: 63,
    },
    {
      name: 'kadabra',
      id: 64,
    },
    {
      name: 'alakazam',
      id: 65,
    },
    {
      name: 'machop',
      id: 66,
    },
    {
      name: 'machoke',
      id: 67,
    },
    {
      name: 'machamp',
      id: 68,
    },
    {
      name: 'bellsprout',
      id: 69,
    },
    {
      name: 'weepinbell',
      id: 70,
    },
    {
      name: 'victreebel',
      id: 71,
    },
    {
      name: 'tentacool',
      id: 72,
    },
    {
      name: 'tentacruel',
      id: 73,
    },
    {
      name: 'geodude',
      id: 74,
    },
    {
      name: 'graveler',
      id: 75,
    },
    {
      name: 'golem',
      id: 76,
    },
    {
      name: 'ponyta',
      id: 77,
    },
    {
      name: 'rapidash',
      id: 78,
    },
    {
      name: 'slowpoke',
      id: 79,
    },
    {
      name: 'slowbro',
      id: 80,
    },
    {
      name: 'magnemite',
      id: 81,
    },
    {
      name: 'magneton',
      id: 82,
    },
    {
      name: 'farfetchd',
      id: 83,
    },
    {
      name: 'doduo',
      id: 84,
    },
    {
      name: 'dodrio',
      id: 85,
    },
    {
      name: 'seel',
      id: 86,
    },
    {
      name: 'dewgong',
      id: 87,
    },
    {
      name: 'grimer',
      id: 88,
    },
    {
      name: 'muk',
      id: 89,
    },
    {
      name: 'shellder',
      id: 90,
    },
    {
      name: 'cloyster',
      id: 91,
    },
    {
      name: 'gastly',
      id: 92,
    },
    {
      name: 'haunter',
      id: 93,
    },
    {
      name: 'gengar',
      id: 94,
    },
    {
      name: 'onix',
      id: 95,
    },
    {
      name: 'drowzee',
      id: 96,
    },
    {
      name: 'hypno',
      id: 97,
    },
    {
      name: 'krabby',
      id: 98,
    },
    {
      name: 'kingler',
      id: 99,
    },
    {
      name: 'voltorb',
      id: 100,
    },
    {
      name: 'electrode',
      id: 101,
    },
    {
      name: 'exeggcute',
      id: 102,
    },
    {
      name: 'exeggutor',
      id: 103,
    },
    {
      name: 'cubone',
      id: 104,
    },
    {
      name: 'marowak',
      id: 105,
    },
    {
      name: 'hitmonlee',
      id: 106,
    },
    {
      name: 'hitmonchan',
      id: 107,
    },
    {
      name: 'likitung',
      id: 108,
    },
    {
      name: 'koffing',
      id: 109,
    },
    {
      name: 'weezing',
      id: 110,
    },
    {
      name: 'rhyhorn',
      id: 111,
    },
    {
      name: 'rhydon',
      id: 112,
    },
    {
      name: 'chansey',
      id: 113,
    },
    {
      name: 'tangela',
      id: 114,
    },
    {
      name: 'kangaskhan',
      id: 115,
    },
    {
      name: 'horsea',
      id: 116,
    },
    {
      name: 'seadra',
      id: 117,
    },
    {
      name: 'goldeen',
      id: 118,
    },
    {
      name: 'seaking',
      id: 119,
    },
    {
      name: 'staryu',
      id: 120,
    },
    {
      name: 'starmie',
      id: 121,
    },
    {
      name: 'mr. mime',
      id: 122,
    },
    {
      name: 'scyther',
      id: 123,
    },
    {
      name: 'jynx',
      id: 124,
    },
    {
      name: 'electabuzz',
      id: 125,
    },
    {
      name: 'magmar',
      id: 126,
    },
    {
      name: 'pinsir',
      id: 127,
    },
    {
      name: 'tauros',
      id: 128,
    },
    {
      name: 'magikarp',
      id: 129,
    },
    {
      name: 'gyrados',
      id: 130,
    },
    {
      name: 'lapras',
      id: 131,
    },
    {
      name: 'ditto',
      id: 132,
    },
    {
      name: 'eevee',
      id: 133,
    },
    {
      name: 'vaporeon',
      id: 134,
    },
    {
      name: 'jolteon',
      id: 135,
    },
    {
      name: 'flareon',
      id: 136,
    },
    {
      name: 'porygon',
      id: 137,
    },
    {
      name: 'omanyte',
      id: 138,
    },
    {
      name: 'omastar',
      id: 139,
    },
    {
      name: 'kabuto',
      id: 140,
    },
    {
      name: 'kabutops',
      id: 141,
    },
    {
      name: 'aerodactyl',
      id: 142,
    },
    {
      name: 'snorlax',
      id: 143,
    },
    {
      name: 'articuno',
      id: 144,
    },
    {
      name: 'zapdos',
      id: 145,
    },
    {
      name: 'moltres',
      id: 146,
    },
    {
      name: 'dratini',
      id: 147,
    },
    {
      name: 'dragonair',
      id: 148,
    },
    {
      name: 'dragonite',
      id: 149,
    },
    {
      name: 'mewtwo',
      id: 150,
    },
    {
      name: 'mew',
      id: 151,
    }
  ];

  this.returnPokemon = function() {
    return pokemon;
  };

} );
