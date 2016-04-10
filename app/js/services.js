'use strict';

var pokedexServices = angular.module('pokedexServices', ['ngResource']);

pokedexServices.factory('Pokemon', ['$resource',
    function($resource) {
        return $resource('http://pokeapi.co/api/v1/pokemon/:id', {
            id: '@id',
        }, {
            query: {
                'method': 'GET',
                isArray: false,
            }
        });
    }
]);
