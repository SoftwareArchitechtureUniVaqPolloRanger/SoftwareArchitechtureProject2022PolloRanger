var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserConsumptionSchema = new Schema({
	'timestamp': Date,
	'userId': String,
	'totalUnits': Number,
	'appliancesUsage': {
		'lights': Number,
		'washingMachine': Number,
		'water': Number,
		'heater': Number,
		'stove': Number,
		'fridge': Number,
		'vaccumCleaner': Number,
		'misc': Number,
	}
});

module.exports = mongoose.model('UserConsumption', UserConsumptionSchema);
