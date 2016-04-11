'use strict';

var pokedexControllers = angular.module('pokedexControllers', []);

pokedexControllers.controller('PokemonController', function($scope, PokemonService) {
    $scope.counter = 0;
    $scope.pokemonsPortionSize = 12;

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
        $scope.pokemonDetails = {
            'Type': pokemon.types.reduce(function(result, type) {
                return result + " " + type.name;
            }, ''),
            'Attack': pokemon.attack,
            'Defense': pokemon.defense, 
            'HP': pokemon.hp,
            'SP Attack': pokemon.sp_atk,
            'SP Defense': pokemon.sp_def,
            'Speed': pokemon.speed,
            'Weight': pokemon.weight,
            'Total moves': pokemon.moves.length
        };
        $scope.pokemon = pokemon;
    };
});
