var mongoose = require('mongoose');

module.exports = mongoose.model('GameLog', {
    playerName: String,
    Log : Array
});
