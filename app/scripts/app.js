'use strict';

angular.module('app', ['ui.router', 'ui.bootstrap', 'app.config.restangular', 'ngFileSaver', 'Mac', 'angular-loading-bar', 'ngAnimate', 'underscore', 'encryptcsar', 'signcsar', 'verifycsar', 'decryptcsar', 'footer']).config(function($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $animateProvider, $httpProvider) {

  $animateProvider.classNameFilter(/ng-animate-enabled/);

  cfpLoadingBarProvider.includeSpinner = false;

  // For any unmatched url, send to /etl
  $urlRouterProvider.otherwise('/encryptcsar');

});
