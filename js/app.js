angular.module( 'pokeApp', [ 'ui.router' ] )
    .config( function( $urlRouterProvider, $stateProvider ){


        $stateProvider
            .state( 'home', {
                templateUrl: '/pokedex.html',
                url: '/pokemon/:id',
                controller: 'pokedexCtrl'
            } );


    } );
