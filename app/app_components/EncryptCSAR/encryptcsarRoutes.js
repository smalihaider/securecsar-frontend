'use strict';

var app = angular.module('encryptcsar.routes', ['ui.router']);

app.config(function ($stateProvider) {

    $stateProvider.state('encryptcsar', {
        url: '/encryptcsar',
        templateUrl: 'app_components/EncryptCSAR/encryptcsar.html',
        controller: 'EncryptCSARController'
    });

});
