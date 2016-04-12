'use strict';

var pokedexServices = angular.module('pokedexServices', ['ngResource']);

pokedexServices.factory('PokemonResourse', ['$resource',
    function($resource) {
        return {
            pokemon: $resource('http://pokeapi.co/api/v1/pokemon/:id', {
                id: '@id'
            }, {
                query: {
                    isArray: false,
                }
            }),

            pokemonType: $resource('http://pokeapi.co/api/v1/type/:id', {
                id: '@id'
            }, {
                query: {
                    isArray: false,
                }
            })
        };
    }
]);
