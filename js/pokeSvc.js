angular.module( 'pokeApp' ).service( 'pokeSvc', function( $http, $q ) {

// initializing variables
  var baseUrl = 'https://pokeapi.co/api/v2/';

//initializing functions that will be used for the service
  String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  };

  function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
  }

//starting the service

//this function returns 151 pokemon
  this.getPokemon = function( pokemons ) {
    return $http.get( baseUrl + 'pokemon/?limit=151' )
      .then( function( pokemon ){
        pokemon = pokemon.data.results;
        for (var i = 0; i < pokemon.length; i++) {
          if ( pokemon[i].url.length === 36 ) {
            var test = pokemon[i].url.slice( 34, 35 );
            pokemon[i].id = parseInt(test);
            var number = padDigits( pokemon[i].url.slice( 34, 35 ), 3 );
            pokemon[i].number = number;
            pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + test + '.png';
          } else if ( pokemon[i].url.length === 37 ) {
            var test2 = pokemon[i].url.slice( 34, 36 );
            pokemon[i].id = parseInt(test2);
            var number2 = padDigits( pokemon[i].url.slice( 34, 36 ), 3 );
            pokemon[i].number = number2;
            pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + test2 + '.png';
          } else if ( pokemon[i].url.length === 38 ) {
            var test3 = pokemon[i].url.slice( 34, 37 );
            pokemon[i].id = parseInt(test3);
            var number3 = padDigits( pokemon[i].url.slice( 34, 37 ), 3 );
            pokemon[i].number = number3;
            pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + test3 + '.png';
          }
          pokemon[i].name = pokemon[i].name.capitalize();
        }
        return pokemon;
      } );
  };

  this.searchByName = function( pokemons, name ) {
    for (var i = 0; i < pokemons.length; i++) {
      if ( pokemons[i].name.toLowerCase() === name.toLowerCase() ) {
        var id = pokemons[i].id;
        return baseUrl + 'pokemon/' + id;
      }
    }
  };

  this.getSpecificInfo = function( url ) {
    var deferer = $q.defer();
    var pokemonInfo;
    var pokemonPokedex;
    var pokeLocation;

    $http.get( url )
      .then( function( specificPokemon ){
        specificPokemon.data.id_dex = padDigits( specificPokemon.data.id, 3 );
        pokemonInfo = specificPokemon.data;
        checkSpecificPokemon();
      } );

      function checkSpecificPokemon() {
        if( pokemonInfo ) {

          $http.get( pokemonInfo.species.url )
            .then( function( pokedexDescription ){
              var pokedexText = {};
              var pokedex = pokedexDescription.data.flavor_text_entries;
              for ( var entry in pokedex) {
                if (pokedex[entry].language.name === 'en' && pokedex[entry].version.name === 'red') {
                  pokedexText = {
                    text: pokedex[entry].flavor_text
                  };
                }
              }
              if( !pokedexText ) {
                pokdexText =  {
                  text: 'This pokemon is not in gen 1'
                };
              }
              pokemonPokedex = pokedexText;
              checkPokemonInfo();
            } );

            $http.get( 'https://pokeapi.co' + pokemonInfo.location_area_encounters )
              .then( function( pokemonLocation ){
                var locations = [];
                var encounterArea = pokemonLocation.data;
                for ( var location in encounterArea ) {
                  for (var i = 0; i < encounterArea[location].version_details.length; i++) {
                    if (
                      encounterArea[location].version_details[i].version.name == 'red'
                        ) {
                      locations.push( {
                        version: encounterArea[location].version_details[i].version.name,
                        area: encounterArea[location].location_area.name,
                        areaUrl: encounterArea[location].location_area.url
                      } );
                    }
                  }
                }
                if ( !locations.length ) {
                  locations.push( {
                    version: 'red, blue, or yellow',
                    area: 'This pokemon is unavailable to catch in the wild in'
                  } );
                }
                pokeLocation = locations;
                checkPokemonInfo();
              } );
        }
      }
      function checkPokemonInfo () {
        if (pokemonPokedex && pokeLocation) {
          deferer.resolve( { info: pokemonInfo, pokedex: pokemonPokedex, location: pokeLocation } );
        }

      }
    return deferer.promise;
  };

} );
