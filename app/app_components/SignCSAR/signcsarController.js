'use strict';

var app = angular.module('signcsar', ['ui.router', 'ui.bootstrap', 'angular-growl', 'dialogs.main', 'signcsar.routes']);

app.controller('SignCSARController', function ($scope, $filter, dialogs, growl, PAGE, Restangular) {

    $scope.init = function () {
        $scope.model = {
            csarfile: '',
            sigfile: '',
            digestalg: 'SHA-256',
            sigalg: 'SHA1withDSA',

            keystoreName: '',
            keystorePassword: '',
            aliasName: '',
            aliasPassword: '',
            keyalg: 'DSA',
            keysize: '1024',

            existingKeystorefile: '',
            existingKeystorePassword: '',
            existingKeystoreAliasName: '',
            existingKeystoreAliasPassword: '',

            firstAndLastName: '',
            organizationalUnit: '',
            organization: '',
            city: '',
            state: '',
            countryCode: '',
            certsigalg: 'SHA1withDSA',
            validity: '',

            dialog: ''
        };
    };

    $scope.init();

    $scope.signCSAR = function () {
        var fd = new FormData();
        $scope.msg = {};
        fd.append('csarFile', $scope.model.csarfile[0]);
        fd.append('sigfile', $scope.model.sigfile);
        fd.append('digestalg', $scope.model.digestalg);
        fd.append('sigalg', $scope.model.sigalg);

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

            fd.append('keystoreInfo.entry.certificateInfo.firstAndLastName', $scope.model.firstAndLastName);
            fd.append('keystoreInfo.entry.certificateInfo.organizationalUnit', $scope.model.organizationalUnit);
            fd.append('keystoreInfo.entry.certificateInfo.organization', $scope.model.organization);
            fd.append('keystoreInfo.entry.certificateInfo.city', $scope.model.city);
            fd.append('keystoreInfo.entry.certificateInfo.state', $scope.model.state);
            fd.append('keystoreInfo.entry.certificateInfo.countryCode', $scope.model.countryCode);

            fd.append('keystoreInfo.entry.certificateInfo.sigalg', $scope.model.certsigalg);

            if ($scope.model.validity) {
                fd.append('keystoreInfo.entry.certificateInfo.validity', $scope.model.validity);
            } else {
                fd.append('keystoreInfo.entry.certificateInfo.validity', "0");
            }
        }

        Restangular.one('securecsar-service/sign')
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

    $scope.setDefaultKeysize = function () {
        if ($scope.model.keyalg == "DSA") {
            $scope.model.keysize = "1024";
        } else {
            $scope.model.keysize = "2048";
        }
    };

    $scope.resetNewKeystoreFeilds = function () {
        $scope.model.keystoreName = "";
        $scope.model.keystorePassword = "";
        $scope.model.aliasName = "";
        $scope.model.aliasPassword = "";
        $scope.model.keyalg = "DSA";
        $scope.model.keysize = "1024";

        $scope.model.firstAndLastName= '';
        $scope.model.organizationalUnit= '';
        $scope.model.organization= '';
        $scope.model.city= '';
        $scope.model.state= '';
        $scope.model.countryCode= '';
        $scope.model.certsigalg= 'SHA1withDSA';
        $scope.model.validity= '';

    };

    $scope.resetExistingKeystoreFeilds = function () {
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