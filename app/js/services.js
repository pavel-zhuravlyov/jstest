'use strict';

var pokedexServices = angular.module('pokedexServices', ['ngResource']);

pokedexServices.factory('Pokemon', ['$resource',
    function($resource) {
        return {
            info: $resource('http://pokeapi.co/api/v1/pokemon/:id', {
                id: '@id',
            }, {
                query: {
                    isArray: false,
                }
            }),
        };
    }
]);

pokedexServices.factory('dataService', function($q, Pokemon) {
    return {
        getPokemonsList: function(portionSize, count) {
            var deferred = $q.defer();

            Pokemon.info.query({
                limit: portionSize,
                offset: portionSize * count
            }).$promise.then(function success(response) {
                deferred.resolve(response.objects);
            }, function error(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
    };
});
