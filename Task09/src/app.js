import angular from 'angular';
import ngResource from 'angular-resource';
import 'angular-ui-router';
import AppController from './app.controller.js';
import PostsComponent from './posts/posts.component.js';
import PostDetailedComponent from './post-detailed/post-detailed.component.js';
import PostsService from './posts/posts.service.js';

angular.module('app', ['ngResource', 'ui.router'])
    .controller('appController', AppController)
    .component('posts', PostsComponent.createInstance())
    .component('postDetailed', new PostDetailedComponent())
    .service('postsService', PostsService)
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise("/");
        $stateProvider.state('postlist', {
            url: "/",
            template: "<posts></posts>"
        }).state('postdetailed', {
            url: "/post/:id",
            template: "<post-detailed post='post'></post-detailed>",
            controller: ($scope, postsService, $stateParams) => {

                $scope.post = postsService.getOneObject($stateParams.id);
            }
        });
    });
