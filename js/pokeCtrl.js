angular.module( 'pokeApp' ).controller( 'pokeCtrl', function( $scope, pokeSvc, pokemon ){


  $scope.pokemon = [];
  $scope.specificPokemon = {};
  $scope.searchPokemon = pokemon.returnPokemon();
  $scope.pokeLocation = [];

  $scope.getPokemon = function() {
    pokeSvc.getPokemon( $scope.searchPokemon )
      .then( function( pokemon ) {
        $scope.pokemon = pokemon;
      } );
  }();

  $scope.getSpecificPokemon = function( url ) {
    $scope.pokeLocation = {};
    pokeSvc.getSpecific( url )
      .then( function( specificPokemon ) {
        $scope.specificPokemon = specificPokemon;
        $scope.pokemonName = specificPokemon.name;
        pokeSvc.findLocation( specificPokemon.location_area_encounters )
          .then( function( pokemonLocation ) {
            $scope.pokeLocation = pokemonLocation;
          } );
      } );
  };

  $scope.getById = function() {
    $scope.pokeLocation = {};
    pokeSvc.getSpecificId( $scope.pokemonId )
      .then( function( specificPokemon ) {
        $scope.specificPokemon = specificPokemon;
        $scope.pokemonName = specificPokemon.name;
        pokeSvc.findLocation( specificPokemon.location_area_encounters )
          .then( function( pokemonLocation ) {
            $scope.pokeLocation = pokemonLocation;
          } );
      } );
  };

  $scope.getByName = function() {
    $scope.pokeLocation = {};
    pokeSvc.searchByName( $scope.searchPokemon, $scope.pokemonName )
    .then( function( specificPokemon ) {
      $scope.specificPokemon = specificPokemon;
      pokeSvc.findLocation( specificPokemon.location_area_encounters )
        .then( function( pokemonLocation ) {
          $scope.pokeLocation = pokemonLocation;
        } );
    } );
  };

  $scope.nextPage = function(){
    pokeSvc.getNextPage( $scope.searchPokemon )
      .then( function( pokemon ){
        $scope.pokemon = pokemon;
      } );
  };
  $scope.previousPage = function(){
    pokeSvc.getPreviousPage( $scope.searchPokemon )
      .then( function( pokemon ){
        $scope.pokemon = pokemon;
      } );
  };


} );
