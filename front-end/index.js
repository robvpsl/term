var app = angular.module("myStats", []);
app.controller("myCtrl", function($scope,$http) {
  $scope.hide = true;

  $scope.getStats = function(name){

    $scope.hide = false;

    console.log("hi");
    var obj = {"playerName":name};
    $scope.stats = [];
    $scope.playerStats = {};
    $scope.playerInfo = {};

    $http.get('http://localhost:3000/getPlayerInfo', obj).then(function(result){
      console.log(result);
      $scope.playerInfo = result.data;
      console.log($scope.playerInfo);
    });

    $http.get('http://localhost:3000/getStats',obj).then(function(result){
      console.log(result);
      $scope.stats = result.data;

    });
    $http.get('http://localhost:3000/getPlayerStats',obj).then(function(result){
      console.log(result);
      $scope.player = result.data;

    });
  }

});
