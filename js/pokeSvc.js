angular.module( 'pokeApp' ).service( 'pokeSvc', function( $http, $q ) {

  var baseUrl = 'http://pokeapi.co/api/v2/';
  var nextPageUrl = null;




  this.getPokemon = function( pokemons ) {
    return $http.get( baseUrl + 'pokemon/?limit=21' )
      .then( function( pokemon ){
        nextPageUrl = pokemon.data.next;
        pokemon = pokemon.data.results;
        for (var i = 0; i < pokemon.length; i++) {
          for (var j = 0; j < pokemons.length; j++) {
            if ( pokemons[j].name === pokemon[i].name ) {
                pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemons[j].id + '.png';
            }
          }
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
      pokemon = pokemon.data.results;
      for (var i = 0; i < pokemon.length; i++) {
        for (var j = 0; j < pokemons.length; j++) {
          if ( pokemons[j].name === pokemon[i].name ) {
              pokemon[i].imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemons[j].id + '.png';
          }
        }
      }
      return pokemon;
    });
  };


} );
