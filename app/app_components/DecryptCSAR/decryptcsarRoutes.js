'use strict';

var app = angular.module('decryptcsar.routes', ['ui.router']);

app.config(function($stateProvider) {

  $stateProvider.
  state('decryptcsar', {
    url: '/decryptcsar',
    templateUrl: 'app_components/DecryptCSAR/decryptcsar.html',
    controller: 'DecryptCSARController'
  });

});
