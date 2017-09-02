angular.module( 'pokeApp' ).controller( 'pokedexCtrl', function( $scope, pokeSvc, pokemon, $stateParams ){
    
    console.log( $stateParams.id );
    
    
      $scope.getPokemon = function() {
        pokeSvc.getPokemon( $scope.searchPokemon )
          .then( function( pokemon ) {
            $scope.pokemon = pokemon;
            console.log( pokemon );
            for (var i = 0; i < pokemon.length; i++) {

                if ( pokemon[i].id == $stateParams.id ) {
                    pokeSvc.getSpecificInfo( pokemon[i].url )
                    .then( function( specificPokemon ){
                          $scope.specificPokemon = specificPokemon.info;
                          $scope.pokemonName = specificPokemon.info.name;
                          $scope.isPokemon = true;
                          $scope.pokedexText = specificPokemon.pokedex.text;
                          $scope.pokeLocation = specificPokemon.location;            
                    } );
                }
            }
          } );
      }();
    
    
    } );
    