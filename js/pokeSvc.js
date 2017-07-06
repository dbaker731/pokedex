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
            // console.log( specificPokemon.data );
            return specificPokemon.data;
          } );
      }
    }
  };

  this.getNextPage = function(){
    return $http.get( nextPageUrl )
    .then( function( pokemon ){
      nextPageUrl = pokemon.data.next;
      return pokemon.data.results;
    });
  };


} );
