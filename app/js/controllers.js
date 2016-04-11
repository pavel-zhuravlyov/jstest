'use strict';

var pokedexControllers = angular.module('pokedexControllers', []);

pokedexControllers.controller('PokemonController', function($scope, dataService) {
    // Pokemon.get({id: 1}, function(pokemon) {
    //     $scope.pokemon = pokemon;
    //   });

    $scope.counter = 0;
    $scope.pokemonsPortionSize = 10;

    dataService.getPokemonsList($scope.pokemonsPortionSize, $scope.counter).then(function(value) {
        $scope.pokemons = value;
    });

    $scope.getPokemonImageUri = function(id) {
        return 'http://pokeapi.co/media/img/' + id + '.png';
    };

    $scope.loadMorePokemons = function() {
        $scope.counter += 1;
        dataService.getPokemonsList($scope.pokemonsPortionSize, $scope.counter).then(function(value) {
            $scope.pokemons = $scope.pokemons.concat(value);
        });
    };
});
