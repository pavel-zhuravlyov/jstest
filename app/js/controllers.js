'use strict';

var pokedexControllers = angular.module('pokedexControllers', []);

pokedexControllers.controller('PokemonController', function($scope, PokemonService) {
    $scope.counter = 0;
    $scope.pokemonsPortionSize = 12;

    angular.element("#spinner").show();
    PokemonService.getPokemonsList($scope.pokemonsPortionSize, $scope.counter).then(function(value) {
        angular.element("#spinner").hide();
        $scope.pokemons = value;
    });
    PokemonService.getPokemonTypes().then(function (value) {
      $scope.pokemonTypes = [];
      value.forEach(function (element) {
        $scope.pokemonTypes.push(element.name);
      });
    });

    $scope.getPokemonImageUrl = function(id) {
        return 'http://pokeapi.co/media/img/' + id + '.png';
    };

    $scope.loadMorePokemons = function() {
        angular.element("#spinner").show();
        $scope.counter += 1;
        PokemonService.getPokemonsList($scope.pokemonsPortionSize, $scope.counter).then(function(value) {
            angular.element("#spinner").hide();
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

    $scope.typeFilter = function (pokemon) {
      if ($scope.selectedType) {
        var types = [];
        pokemon.types.forEach(function (type) {
          types.push(type.name);
        });
        return types.some(function (element) {
          return element == $scope.selectedType.toLowerCase();
        });
      } else {
        return true;
      }

    };
});
