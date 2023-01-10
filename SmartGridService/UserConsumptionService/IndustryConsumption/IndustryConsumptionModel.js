var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IndustryConsumptionSchema = new Schema({
	'timestamp': Date,
	'industryId': String,
	'totalUnits': Number,
	'appliancesUsage': {
		'lights': Number,
		'devices': Number,
		'thermal': Number,
		'appliances': Number,
		'machinery': Number,
		'misc': Number,

	}
});

module.exports = mongoose.model('IndustryConsumption', IndustryConsumptionSchema);
