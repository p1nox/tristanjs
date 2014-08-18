'use strict';

/**
 * Home controller simply lists all the posts from everyone on the front page.
 */

angular.module('koan.remda').controller('RemDaCtrl', function ($scope, api) {

  var user = $scope.common.user;
  $scope.dataBox = {content: '', disabled: false};

  $scope.userRemDas = [];

  var fetchRemDas = function(){
    api.remDas.list().success(function(remDas) {
      $scope.userRemDas = remDas;
    });
  };

  fetchRemDas();
  $scope.createRemData = function($event){

    if (!$scope.dataBox.content.length || $scope.dataBox.disabled) {
      $event.preventDefault();
      return;
    }

    $scope.dataBox.disabled = true;

    api.remDas.create({url: $scope.dataBox.url, content: $scope.dataBox.content})
    .success(function (remDaId) {
      console.log("@@@@");
      console.log(remDaId);
      $scope.dataBox.message = '';
      $scope.dataBox.disabled = false;
      fetchRemDas();
      // show message and go to the remData details
    })
    .error(function () {
      $scope.dataBox.disabled = false;
      // show error message
    });

  };

});
