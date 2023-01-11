var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ContextualizedPowerDataSchema = new Schema({
	'timestamp' : Date,
	'power' : String,
	'cost' : String,
	'powerSource' : String
});

module.exports = mongoose.model('ContextualizedPowerData', ContextualizedPowerDataSchema);
