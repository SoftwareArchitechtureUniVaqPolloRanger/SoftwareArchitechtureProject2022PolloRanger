var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var IndustryCostCalculationSchema = new Schema({
	'consumerId' : String,
	'month' : String,
	'costUnit' : String,
	'cost' : Number
});

module.exports = mongoose.model('IndustryCostCalculation', IndustryCostCalculationSchema);
