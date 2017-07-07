angular.module( 'pokeApp' ).controller( 'pokeCtrl', function( $scope, pokeSvc, pokemon ){


  $scope.pokemon = [];
  $scope.specificPokemon = {};
  $scope.searchPokemon = pokemon.returnPokemon();
  $scope.pokeLocation = [];

  $scope.getPokemon = function() {
    pokeSvc.getPokemon()
      .then( function( pokemon ) {
        $scope.pokemon = pokemon;
      } );
  };

  $scope.getPokemon();

  $scope.getSpecificPokemon = function( url ) {
    pokeSvc.getSpecific( url )
      .then( function( specificPokemon ) {
        $scope.specificPokemon = specificPokemon;
        pokeSvc.findLocation( specificPokemon.location_area_encounters )
          .then( function( pokemonLocation ) {
            $scope.pokeLocation = pokemonLocation;
          } );
      } );
  };

  $scope.getById = function() {
    pokeSvc.getSpecificId( $scope.pokemonId )
      .then( function( specificPokemon ) {
        $scope.specificPokemon = specificPokemon;
        pokeSvc.findLocation( specificPokemon.location_area_encounters )
          .then( function( pokemonLocation ) {
            $scope.pokeLocation = pokemonLocation;
          } );
      } );
  };

  $scope.getByName = function() {
    pokeSvc.searchByName( $scope.searchPokemon, $scope.pokemonName )
    .then( function( specificPokemon ) {
      $scope.specificPokemon = specificPokemon;
      pokeSvc.findLocation( specificPokemon.location_area_encounters )
        .then( function( pokemonLocation ) {
          $scope.pokeLocation = pokemonLocation;
        } );
    } );
  };

  $scope.getNextPage = function(){
    pokeSvc.getNextPage()
      .then( function( pokemon ){
        $scope.pokemon = pokemon;
      } );
  };


} );
