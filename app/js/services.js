'use strict';

var pokedexServices = angular.module('pokedexServices', ['ngResource']);

pokedexServices.factory('PokemonResourse', ['$resource',
    function($resource) {
        return $resource('http://pokeapi.co/api/v1/pokemon/:id', {
            id: '@id',
        }, {
            query: {
                isArray: false,
            }
        });
    }
]);

pokedexServices.factory('PokemonService', function($q, PokemonResourse) {
    return {
        getPokemonsList: function(portionSize, count) {
            var deferred = $q.defer();

            PokemonResourse.query({
                limit: portionSize,
                offset: portionSize * count
            }).$promise.then(function success(response) {
                deferred.resolve(response.objects);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },

        getPokemon: function(pokemonId) {
            var deferred = $q.defer();

            PokemonResourse.get({
                id: pokemonId
            }).$promise.then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    };
});
