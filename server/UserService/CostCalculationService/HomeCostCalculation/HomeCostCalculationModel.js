var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomeCostCalculationSchema = new Schema({
	'consumerId': String,
	'month': String,
	'cost': Number,
	'costUnit': String
});

module.exports = mongoose.model('CostCalculation', HomeCostCalculationSchema);
