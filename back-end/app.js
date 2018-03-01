const NBA = require("nba");
const curry = NBA.findPlayer('LeBron James');
console.log(curry);



const express = require("express");
var cors = require('./cors.js');

const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors);

app.get('/get', (req, res) => {
    res.send(curry);
});




app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
