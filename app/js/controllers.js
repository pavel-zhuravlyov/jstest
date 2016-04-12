'use strict';

var pokedexControllers = angular.module('pokedexControllers', []);

pokedexControllers.controller('PokemonController', function($scope, PokemonResourse) {
    $scope.counter = 0;
    $scope.pokemonsPortionSize = 12;
    $scope.pokemons = [];

    $scope.getPokemonsList = function() {
        $scope.spinner = true;
        PokemonResourse.pokemon.query({
            limit: $scope.pokemonsPortionSize,
            offset: $scope.counter * $scope.pokemonsPortionSize
        }, function(data) {
            $scope.pokemons = $scope.pokemons.concat(data.objects);
            $scope.spinner = false;
        }, function(err) {
            console.log(err);
        });
    };

    $scope.getPokemonsTypes = function() {
        PokemonResourse.pokemonType.query({
            limit: 100
        }, function(data) {
            $scope.pokemonTypes = [];
            data.objects.forEach(function(element) {
                $scope.pokemonTypes.push(element.name);
            });
        }, function(err) {
            console.log(err);
        });
    };

    $scope.getPokemonsList();
    $scope.getPokemonsTypes();

    $scope.loadMorePokemons = function() {
        $scope.counter += 1;
        $scope.getPokemonsList();
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

    $scope.typeFilter = function(pokemon) {
        if ($scope.selectedType) {
            var types = [];
            pokemon.types.forEach(function(type) {
                types.push(type.name);
            });
            return types.some(function(element) {
                return element == $scope.selectedType.toLowerCase();
            });
        } else {
            return true;
        }

    };
});
