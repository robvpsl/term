var app = angular.module("myStats", []);
app.controller("myCtrl", function($scope,$http) {
  $scope.hide = true;
  $scope.buttonString = "Compare";
  var check = true;
  $scope.players = [];
  $scope.showModal = false;
  $scope.modal = "";
  $scope.img = "";

  $scope.getStats = function(name){

    $scope.buttonString = "Compare";



    $scope.hide = false;
    var obj = {"playerName":name};


    $scope.stats = [];
    $scope.player = {};
    $scope.playerInfo = {};

    $http.post('http://localhost:3000/getPlayerInfo', obj).then(function(result){
      if(result.data === "bad"){
        $scope.hide = true;
      }
      else{
        $scope.playerInfo = result.data;
        $scope.img = "https://nba-players.herokuapp.com/players/" + $scope.playerInfo.commonPlayerInfo[0].lastName + "/" + $scope.playerInfo.commonPlayerInfo[0].firstName;
      }

    });

    $http.post('http://localhost:3000/getStats',obj).then(function(result){
      $scope.stats = result.data;

    });
    $http.post('http://localhost:3000/getPlayerStats',obj).then(function(result){
      $scope.player = result.data;

    });
  }

  $scope.compare = function(){

    $scope.players.push($scope.player);
    if($scope.players.length>1){
      $("#exampleModalLong").modal()
    }


  }

  $scope.remove = function(){
  }

});
