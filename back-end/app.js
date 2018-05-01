const NBA = require("nba");
const curry = NBA.findPlayer('LeBron James');
const PlayerStats = require('./PlayerStats');
const GameLog = require('./GameLog');
const PlayerInfo = require('./PlayerInfo');
console.log(curry);


// var myPromise = new Promise(function(resolve, reject){
//    return NBA.stats.assistTracker('LeBron James');
// })

//const test = NBA.stats.assistTracker('LeBron James');
//console.log(myPromise);


//var promise2 = NBA.stats.commonTeamRoster({"TeamID": "1610612744"});
// var promise3 = NBA.stats.homepageV2('LeBron James');
// var promise4 = NBA.stats.playByPlay('LeBron James');
// var promise5 = NBA.stats.playerClutch('LeBron James');
// var promise6 = NBA.stats.playerInfo('LeBron James');
// var promise7 = NBA.stats.playerSplits({PlayerID:2544});
// var promise8 = NBA.stats.playerShooting('LeBron James');
// var promise9 = NBA.stats.playerSplits('LeBron James');
// var promise0 = NBA.stats.playerStats('LeBron James');
// var promiseq = NBA.stats.playerTracking('LeBron James');
// var promisew = NBA.stats.scoreboard('LeBron James');
// var promisee = NBA.stats.shots('LeBron James');
// var promiser = NBA.stats.teamClutch('LeBron James');
// var promiset = NBA.stats.teamHistoricalLeaders('LeBron James');
// var promisey = NBA.stats.teamInfoCommon('LeBron James');
// var promiseu = NBA.stats.teamPlayerDashboard('LeBron James');
// var promisei = NBA.stats.teamShooting('LeBron James');
// var promiseo = NBA.stats.teamSplits('LeBron James');
//var promise3 = NBA.stats.leagueGameLog({"PlayerOrTeam": "P"});
//var promise3 = NBA.stats.playerStats();
//var results;
//promise7.then(console.log, console.error);
// promise3.then(function(data){
//   console.log(data.resultSets);
// });
//console.log(promise3.resultSet);
//promise3.then(console.log, console.error);
//promise4.then(console.log, console.error);
//promise5.then(console.log, console.error);
//promise6.then(console.log, console.error);
//promise7.then(console.log, console.error);
//promise8.then(console.log, console.error);
//promise9.then(console.log, console.error);
//promise0.then(console.log, console.error);
//promiseq.then(console.log, console.error);
//promisew.then(console.log, console.error);
//promisee.then(console.log, console.error);
//promiser.then(console.log, console.error);
//promiset.then(console.log, console.error);
//promisey.then(console.log, console.error);
//promiseu.then(console.log, console.error);
//promisei.then(console.log, console.error);
//promiseo.then(console.log, console.error);


const express = require("express");
var mongoose = require('mongoose');
var cors = require('./cors.js');

const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors);

mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
    if (!err) {
        console.log("we are connected to mongo");
    } else {
        console.log("Can't connect to mongo");
    }
    database = db;
});

// var promise = NBA.stats.playerStats();
//
// promise.then(function(data){
//   //console.log(getKeys(data));
//   //console.log(data.leagueDashPlayerStats);
//   for (var i = 0, len = data.leagueDashPlayerStats.length; i < len; i++) {
//     var player = new PlayerStats(data.leagueDashPlayerStats[i]);
//     player.save();
//   }
// });
//
// var promise2 = NBA.stats.leagueGameLog({"PlayerOrTeam": "P"});
//
//
// promise2.then(function(data){
//   //console.log(data.resultSets);
//   for (var i = 0, len = data.resultSets.length; i < len; i++) {
//   for (var j = 0, len = data.resultSets[i].rowSet.length; j < len; j++) {
//       var log = new GameLog({"playerName":data.resultSets[i].rowSet[j][2],"Log":data.resultSets[i].rowSet[j]});
//       log.save();
//     }
//
//   }
//   console.log("done");
// }).catch(function(err){
//   console.log("gotcha bih!");
// });

// var getKeys = function(obj){
//    var keys = [];
//    for(var key in obj){
//       keys.push(key);
//    }
//    return keys;
// }

app.get('/getPlayerInfo',(req,res)=>{
  var player = req.body;

  PlayerStats.findOne(
      {playerName: "LeBron James"},
      function(err, result) {
         var promise = NBA.stats.playerInfo({PlayerID:result.playerId});
         promise.then(function(data){
           res.send(data);
         })
      });

});

app.get('/getPlayerStats',(req,res) => {
  var player =  req.body;
  //console.log(player);
   PlayerStats.findOne(
       {playerName: "LeBron James"},
       function(err, result) {
           res.send(result);
       });
})

app.get('/getStats', (req, res) => {
  var player =  req.body.playerName;
  //console.log(player);
  GameLog.find({playerName: "LeBron James"},
      function(err, result) {
        console.log(result.length);
          res.send(result);
      });
});




app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
