'use strict';

var app = angular.module('verifycsar', ['ui.router', 'ui.bootstrap', 'angular-growl', 'dialogs.main', 'verifycsar.routes']);

app.controller('VerifyCSARController', function ($scope, $filter, dialogs, growl, PAGE, Restangular) {

    $scope.init = function () {
        $scope.model = {
            csarfile: '',
            sigfile: '',
            dialog: ''
        };
    };

    $scope.init();

    $scope.verifyCSAR = function () {
        var fd = new FormData();
        $scope.msg = {};
        fd.append('csarFile', $scope.model.csarfile[0]);
        fd.append('sigfile', $scope.model.sigfile);

        Restangular.one('securecsar/verify')
            .withHttpConfig({transformRequest: angular.identity})
            .customPOST(fd, undefined, undefined,
                {'Content-Type': undefined}).then(function (success) {
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