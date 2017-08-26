angular.module( 'pokeApp' ).controller( 'pokeCtrl', function( $scope, pokeSvc, pokemon ){


  $scope.pokemon = [];
  $scope.specificPokemon = {};
  $scope.searchPokemon = pokemon.returnPokemon();
  $scope.pokeLocation = {};
  $scope.pokedexText = '';
  $scope.isPokemon = false;

  $scope.getPokemon = function() {
    pokeSvc.getPokemon( $scope.searchPokemon )
      .then( function( pokemon ) {
        $scope.pokemon = pokemon;
      } );
  }();

  $scope.getSpecificPokemon = function( url ) {
     pokeSvc.getSpecificInfo( url )
      .then( function( specificPokemon ){
            $scope.specificPokemon = specificPokemon.info;
            $scope.pokemonName = specificPokemon.info.name;
            $scope.isPokemon = true;
            $scope.pokedexText = specificPokemon.pokedex.text;
            $scope.pokeLocation = specificPokemon.location;
      } );
  };

  $scope.getByName = function() {
    pokeSvc.getSpecificInfo( pokeSvc.searchByName( $scope.searchPokemon, $scope.pokemonName ) )
    .then( function( specificPokemon ){
          $scope.specificPokemon = specificPokemon.info;
          $scope.pokemonName = specificPokemon.info.name;
          $scope.isPokemon = true;
          $scope.pokedexText = specificPokemon.pokedex.text;
          $scope.pokeLocation = specificPokemon.location;
    } );
  };

} );
