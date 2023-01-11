var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfficeConsumptionSchema = new Schema({
	'timestamp': Date,
	'officeId': String,
	'totalUnits': Number,
	'appliancesUsage': {
		'lights': Number,
		'thermalPower': Number,
		'devices': Number,
		'elevator': Number,
		'cooking': Number,
		'coffeeMachine': Number,
		'fridge': Number,
		'microwave': Number,
		'misc': Number,
	}
});

module.exports = mongoose.model('OfficeConsumption', OfficeConsumptionSchema);
