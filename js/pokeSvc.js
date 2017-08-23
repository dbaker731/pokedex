angular.module( 'pokeApp' ).service( 'pokeSvc', function( $http, $q ) {

// initializing variables
  var baseUrl = 'https://pokeapi.co/api/v2/';
  var nextPageUrl = null;
  var previousPageUrl = null;

//initializing functions that will be used for the service
  String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  };

  function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
  }

//starting the service

//this function returns 21 pokemonm per page
  this.getPokemon = function( pokemons ) {
    return $http.get( baseUrl + 'pokemon/?limit=151' )
      .then( function( pokemon ){
        nextPageUrl = pokemon.data.next;
        previousPageUrl = pokemon.data.previous;
        pokemon = pokemon.data.results;
        for (var i = 0; i < pokemon.length; i++) {


          if ( pokemon[i].url.length === 36 ) {
            var test = pokemon[i].url.slice( 34, 35 );
            var number = padDigits( pokemon[i].url.slice( 34, 35 ), 3 );
            pokemon[i].number = number;
            pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + test + '.png';
          } else if ( pokemon[i].url.length === 37 ) {
            var test2 = pokemon[i].url.slice( 34, 36 );
            var number2 = padDigits( pokemon[i].url.slice( 34, 36 ), 3 );
            pokemon[i].number = number2;
            pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + test2 + '.png';
          } else if ( pokemon[i].url.length === 38 ) {
            var test3 = pokemon[i].url.slice( 34, 37 );
            var number3 = padDigits( pokemon[i].url.slice( 34, 37 ), 3 );
            pokemon[i].number = number3;
            pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + test3 + '.png';
          }
          pokemon[i].name = pokemon[i].name.capitalize();
        }
        return pokemon;
      } );
  };


  this.getSpecific = function( url ) {
    return $http.get( url )
      .then( function( specificPokemon ){

        specificPokemon.data.id = padDigits( specificPokemon.data.id, 3 );
        // console.log( specificPokemon.data.id );
        return specificPokemon.data;
      } );
  };

  this.getSpecificId = function( id ) {
    return $http.get( baseUrl + 'pokemon/' + id )
      .then( function( specificPokemon ){
        return specificPokemon.data;
      } );
  };

  this.searchByName = function( pokemons, name ) {
    for (var i = 0; i < pokemons.length; i++) {
      if ( pokemons[i].name.toLowerCase() === name.toLowerCase() ) {
        var id = pokemons[i].id;
        return $http.get( baseUrl + 'pokemon/' + id )
          .then( function( specificPokemon ){
            return specificPokemon.data;
          } );
      }
    }
  };

  this.findLocation = function ( locationUrl ) {
    return $http.get( 'https://pokeapi.co' + locationUrl )
      .then( function( pokemonLocation ){
        var locations = [];
        var encounterArea = pokemonLocation.data;
        for ( var location in encounterArea ) {
          for (var i = 0; i < encounterArea[location].version_details.length; i++) {
            if (
            // encounterArea[location].version_details[i].version.name == 'blue' ||
            encounterArea[location].version_details[i].version.name == 'red'
            // encounterArea[location].version_details[i].version.name == 'yellow'
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
        return locations;
      } );
  };

  this.getPokedexDescription = function ( speciesUrl ){
    return $http.get( speciesUrl )
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
        return pokedexText;
      } );
  };


  this.getSpecificInfo = function( url ) {

    var deferer = $q.defer();
    var pokemonInfo;
    var pokemonPokedex;
    var pokeLocation;

    $http.get( url )
      .then( function( specificPokemon ){
        specificPokemon.data.id = padDigits( specificPokemon.data.id, 3 );
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

  // this.getNextPage = function( pokemons ){
  //   return $http.get( nextPageUrl )
  //   .then( function( pokemon ){
  //     nextPageUrl = pokemon.data.next;
  //     previousPageUrl = pokemon.data.previous;
  //     pokemon = pokemon.data.results;
  //     for (var i = 0; i < pokemon.length; i++) {
  //       for (var j = 0; j < pokemons.length; j++) {
  //         if ( pokemons[j].name === pokemon[i].name ) {
  //           var number = padDigits( pokemons[j].id, 3 );
  //           pokemon[i].number = number;
  //           pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemons[j].id + '.png';
  //         }
  //       }
  //       pokemon[i].name = pokemon[i].name.capitalize();
  //     }
  //     return pokemon;
  //   });
  // };

  // this.getPreviousPage = function( pokemons ){
  //   if ( previousPageUrl ) {
  //     return $http.get( previousPageUrl )
  //     .then( function( pokemon ){
  //       nextPageUrl = pokemon.data.next;
  //       previousPageUrl = pokemon.data.previous;
  //       pokemon = pokemon.data.results;
  //       for (var i = 0; i < pokemon.length; i++) {
  //         for (var j = 0; j < pokemons.length; j++) {
  //           if ( pokemons[j].name === pokemon[i].name ) {
  //             var number = padDigits( pokemons[j].id, 3 );
  //             pokemon[i].number = number;
  //             pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemons[j].id + '.png';
  //           }
  //         }
  //         pokemon[i].name = pokemon[i].name.capitalize();
  //       }
  //       return pokemon;
  //     });
  //   } else {
  //     alert( 'CAN\'\T GO BACK NERD' );
  //   }
  // };


} );
