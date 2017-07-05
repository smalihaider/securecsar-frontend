'use strict';

var app = angular.module('decryptcsar', ['ui.router', 'ngTable', 'app.config', 'sdeutils', 'ui.select', 'app.constants', 'select2filter', 'ui.bootstrap', 'angular-growl', 'decryptcsar.routes']);
app.controller('DecryptCSARController', function($scope, $filter, ngTableParams, sdeutils, APP_CONFIG, growl, PAGE, Restangular) {

    $scope.init = function () {
        $scope.model = {
            csarfile: '',
            existingKeystorefile: '',
            existingKeystorePassword: '',
            existingKeystoreAliasName: '',
            existingKeystoreAliasPassword: '',
            dialog: ''
        };
    };

    $scope.init();

    $scope.decryptCSAR = function () {
        var fd = new FormData();
        $scope.msg = {};
        fd.append('csarFile', $scope.model.csarfile[0]);
        fd.append('keystoreFile', $scope.model.existingKeystorefile[0]);
        fd.append('keystoreInfo.keystorePass', $scope.model.existingKeystorePassword);
        fd.append('keystoreInfo.entry.aliasName', $scope.model.existingKeystoreAliasName);
        fd.append('keystoreInfo.entry.aliasPass', $scope.model.existingKeystoreAliasPassword);

        Restangular.one('securecsar-service/decrypt')
            .withHttpConfig({transformRequest: angular.identity})
            .customPOST(fd, undefined, undefined,
                {'Content-Type': undefined}).then(function (success) {
            success.downloadLink = 'http://localhost:8080/securecsar-service/' + success.downloadLink;
            $scope.msg = success;
            $('#myModal').modal('show');
        }, function (failure) {
            $scope.msg = failure.data;
            $('#myModal').modal('show');
        });
    };
});

app.directive("filesInput", function () {
    return {
        require: "ngModel",
        link: function postLink($scope, elem, attrs, ngModel) {
            elem.on("change", function (e) {
                var files = elem[0].files;
                ngModel.$setViewValue(files);
            });
        }
    };
});