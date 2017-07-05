'use strict';

var app = angular.module('encryptcsar', ['ui.router', 'ui.bootstrap', 'angular-growl', 'dialogs.main', 'encryptcsar.routes']);

app.controller('EncryptCSARController', function ($scope, $filter, dialogs, growl, PAGE, Restangular) {

    $scope.init = function () {
        $scope.model = {
            csarfile: '',
            encAlg: 'AES',
            encryptedBy: '',
            encryptorContact: '',

            keystoreName: '',
            keystorePassword: '',
            aliasName: '',
            aliasPassword: '',
            keyalg: 'AES',
            keysize: '128',

            existingKeystorefile: '',
            existingKeystorePassword: '',
            existingKeystoreAliasName: '',
            existingKeystoreAliasPassword: '',
            dialog: ''
        };
    };

    $scope.init();

    $scope.encryptCSAR = function () {
        var fd = new FormData();
        $scope.msg = {};
        fd.append('csarFile', $scope.model.csarfile[0]);
        fd.append('encAlg', $scope.model.encAlg);
        fd.append('encryptedBy', $scope.model.encryptedBy);
        fd.append('encryptorContact', $scope.model.encryptorContact);


        if ($scope.model.existingKeystorefile) {
            fd.append('keystoreFile', $scope.model.existingKeystorefile[0]);
            fd.append('keystoreInfo.keystorePass', $scope.model.existingKeystorePassword);
            fd.append('keystoreInfo.entry.aliasName', $scope.model.existingKeystoreAliasName);
            fd.append('keystoreInfo.entry.aliasPass', $scope.model.existingKeystoreAliasPassword);

        } else {
            fd.append('keystoreInfo.keystoreName', $scope.model.keystoreName);
            fd.append('keystoreInfo.keystorePass', $scope.model.keystorePassword);
            fd.append('keystoreInfo.entry.aliasName', $scope.model.aliasName);
            fd.append('keystoreInfo.entry.aliasPass', $scope.model.aliasPassword);
            fd.append('keystoreInfo.entry.keyalg', $scope.model.keyalg);
            fd.append('keystoreInfo.entry.keysize', $scope.model.keysize);
        }

        Restangular.one('securecsar/encrypt')
            .withHttpConfig({transformRequest: angular.identity})
            .customPOST(fd, undefined, undefined,
                {'Content-Type': undefined}).then(function (success) {
            success.downloadLink = 'http://localhost:8080/securecsar/' + success.downloadLink;
            $scope.msg = success;
            $('#myModal').modal('show');
        }, function (failure) {
            $scope.msg = failure.data;
            $('#myModal').modal('show');
        });
    };

    $scope.setDefaultKeysize = function() {
        if ($scope.model.keyalg == "AES") {
            $scope.model.keysize = "128";
        } else if ($scope.model.keyalg == "DES") {
            $scope.model.keysize = "56";
        } else {
            $scope.model.keysize = "112";
        }
    };

    $scope.resetNewKeystoreFeilds = function() {
        $scope.model.keystoreName = "";
        $scope.model.keystorePassword = "";
        $scope.model.aliasName = "";
        $scope.model.aliasPassword = "";
        $scope.model.keyalg = "AES";
        $scope.model.keysize = "128";
    };

    $scope.resetExistingKeystoreFeilds = function() {
        $scope.model.existingKeystorefile = "";
        $scope.model.existingKeystorePassword = "";
        $scope.model.existingKeystoreAliasName = "";
        $scope.model.existingKeystoreAliasPassword = "";
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