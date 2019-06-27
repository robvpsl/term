const NBA = require("nba");
const PlayerStats = require('./PlayerStats');
const GameLog = require('./GameLog');



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

var promise = NBA.stats.playerStats();

promise.then(function(data){
  for (var i = 0, len = data.leagueDashPlayerStats.length; i < len; i++) {
    var player = new PlayerStats(data.leagueDashPlayerStats[i]);
    player.save();
  }
});

var promise2 = NBA.stats.leagueGameLog({"PlayerOrTeam": "P"});


promise2.then(function(data){
  for (var i = 0, len = data.resultSets.length; i < len; i++) {
  for (var j = 0, len = data.resultSets[i].rowSet.length; j < len; j++) {
      var log = new GameLog({"playerName":data.resultSets[i].rowSet[j][2],"Log":data.resultSets[i].rowSet[j]});
      log.save();
    }

  }
  console.log("done");
}).catch(function(err){
  console.log("no error");
});

var getKeys = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}

app.post('/getPlayerInfo',(req,res)=>{
  PlayerStats.findOne(
      {playerName: req.body.playerName},
      function(err, result) {

        if(result===null){
          res.send("bad");
        }
        else{
          var promise = NBA.stats.playerInfo({PlayerID:result.playerId});
          promise.then(function(data){
            res.send(data);
          })
        }

      });

});

app.post('/getPlayerStats',(req,res) => {
   PlayerStats.findOne(
       {playerName: req.body.playerName},
       function(err, result) {
           res.send(result);
       });
})

app.post('/getStats', (req, res) => {
  GameLog.find({playerName: req.body.playerName},
      function(err, result) {
        console.log(result.length);
          res.send(result);
      });
});

app.get('/test', (req,res) => {
  res.send('we goodddd');
})




app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
