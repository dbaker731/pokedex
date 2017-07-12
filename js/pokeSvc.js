angular.module( 'pokeApp' ).service( 'pokeSvc', function( $http, $q ) {

// initializing variables
  var baseUrl = 'http://pokeapi.co/api/v2/';
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
    return $http.get( baseUrl + 'pokemon/?limit=21' )
      .then( function( pokemon ){
        nextPageUrl = pokemon.data.next;
        previousPageUrl = pokemon.data.previous;
        pokemon = pokemon.data.results;
        for (var i = 0; i < pokemon.length; i++) {
          for (var j = 0; j < pokemons.length; j++) {
            if ( pokemons[j].name === pokemon[i].name ) {
                var number = padDigits( pokemons[j].id, 3 );
                pokemon[i].number = number;
                pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemons[j].id + '.png';
            }
          }
          pokemon[i].name = pokemon[i].name.capitalize();
        }
        return pokemon;
      } );
  };


  this.getSpecific = function( url ) {
    return $http.get( url )
      .then( function( specificPokemon ){
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
    return $http.get( 'http://pokeapi.co' + locationUrl )
      .then( function( pokemonLocation ){
        var locations = [];
        var encounterArea = pokemonLocation.data;
        for ( var location in encounterArea ) {
          for (var i = 0; i < encounterArea[location].version_details.length; i++) {
            if ( encounterArea[location].version_details[i].version.name == 'blue' ||
            encounterArea[location].version_details[i].version.name == 'red' ||
            encounterArea[location].version_details[i].version.name == 'yellow' ) {
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

  this.getNextPage = function( pokemons ){
    return $http.get( nextPageUrl )
    .then( function( pokemon ){
      nextPageUrl = pokemon.data.next;
      previousPageUrl = pokemon.data.previous;
      pokemon = pokemon.data.results;
      for (var i = 0; i < pokemon.length; i++) {
        for (var j = 0; j < pokemons.length; j++) {
          if ( pokemons[j].name === pokemon[i].name ) {
            var number = padDigits( pokemons[j].id, 3 );
            pokemon[i].number = number;
            pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemons[j].id + '.png';
          }
        }
        pokemon[i].name = pokemon[i].name.capitalize();
      }
      return pokemon;
    });
  };

  this.getPreviousPage = function( pokemons ){
    if ( previousPageUrl ) {
      return $http.get( previousPageUrl )
      .then( function( pokemon ){
        nextPageUrl = pokemon.data.next;
        previousPageUrl = pokemon.data.previous;
        pokemon = pokemon.data.results;
        for (var i = 0; i < pokemon.length; i++) {
          for (var j = 0; j < pokemons.length; j++) {
            if ( pokemons[j].name === pokemon[i].name ) {
              var number = padDigits( pokemons[j].id, 3 );
              pokemon[i].number = number;
              pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemons[j].id + '.png';
            }
          }
          pokemon[i].name = pokemon[i].name.capitalize();
        }
        return pokemon;
      });
    } else {
      alert( 'CAN\'\T GO BACK NERD' );
    }
  };


} );
