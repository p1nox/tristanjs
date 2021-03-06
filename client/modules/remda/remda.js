'use strict';

angular
    .module('koan.remda', [
      'ngRoute',
      'monospaced.elastic',
      'koan.common'
    ])
    .config(function ($routeProvider) {
      $routeProvider
          .when('/remda', {
            title: 'Tristanjs Remote Data',
            templateUrl: 'modules/remda/remda.html',
            controller: 'RemDaCtrl'
          });
    });
