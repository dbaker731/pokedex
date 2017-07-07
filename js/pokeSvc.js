angular.module( 'pokeApp' ).service( 'pokeSvc', function( $http, $q ) {

  var baseUrl = 'http://pokeapi.co/api/v2/';
  var nextPageUrl = null;


  this.getPokemon = function() {

  return $http.get( baseUrl + 'pokemon' )
    .then( function( pokemon ){
      nextPageUrl = pokemon.data.next;
      return pokemon.data.results;
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

  this.getNextPage = function(){
    return $http.get( nextPageUrl )
    .then( function( pokemon ){
      nextPageUrl = pokemon.data.next;
      return pokemon.data.results;
    });
  };


} );
