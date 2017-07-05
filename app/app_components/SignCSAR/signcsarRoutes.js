'use strict';

var app = angular.module('signcsar.routes', ['ui.router']);

app.config(function($stateProvider) {

  $stateProvider.
  state('signcsar', {
    url: '/signcsar',
    templateUrl: 'app_components/SignCSAR/signcsar.html',
    controller: 'SignCSARController'
  });

});
