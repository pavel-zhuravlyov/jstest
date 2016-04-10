'use strict';

var pokedexControllers = angular.module('pokedexControllers', []);

pokedexControllers.controller('PokemonController', function($scope, Pokemon) {
    // Pokemon.get({id: 1}, function(pokemon) {
    //     $scope.pokemon = pokemon;
    //   });

    $scope.counter = 0;
    $scope.pokemonsPortionSize = 10;

    Pokemon.query({
        limit: 10,
    }).$promise.then(function(response) {
        $scope.pokemons = response.objects;
    });

    $scope.loadMorePokemons = function() {
        $scope.counter += 1;
        Pokemon.query({
            limit: $scope.pokemonsPortionSize,
            offset: $scope.pokemonsPortionSize * $scope.counter
        }).$promise.then(function(response) {
            $scope.pokemons = $scope.pokemons.concat(response.objects);
        });
    };
});
