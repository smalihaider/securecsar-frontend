'use strict';

var app = angular.module('verifycsar.routes', ['ui.router']);

app.config(function($stateProvider) {

  $stateProvider.
  state('verifycsar', {
    url: '/verifycsar',
    templateUrl: 'app_components/VerifyCSAR/verifycsar.html',
    controller: 'VerifyCSARController'
  });

});
