var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var OfficeCostCalculationSchema = new Schema({
	'consumerId' : String,
	'month' : String,
	'cost' : Number,
	'costUnit' : String
});

module.exports = mongoose.model('OfficeCostCalculation', OfficeCostCalculationSchema);
