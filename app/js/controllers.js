'use strict';

var pokedexControllers = angular.module('pokedexControllers', []);

pokedexControllers.controller('PokemonController', function($scope, PokemonService) {
    $scope.counter = 0;
    $scope.pokemonsPortionSize = 10;

    PokemonService.getPokemonsList($scope.pokemonsPortionSize, $scope.counter).then(function(value) {
        $scope.pokemons = value;
    });

    $scope.getPokemonImageUri = function(id) {
        return 'http://pokeapi.co/media/img/' + id + '.png';
    };

    $scope.loadMorePokemons = function() {
        $scope.counter += 1;
        PokemonService.getPokemonsList($scope.pokemonsPortionSize, $scope.counter).then(function(value) {
            $scope.pokemons = $scope.pokemons.concat(value);
        });
    };


    $scope.showPokemonDetails = function(pokemon) {
        // PokemonService.getPokemon(id).then(function(value) {
        //     $scope.pokemon = value;
        // });
        $scope.pokemon = pokemon;
    };
});
