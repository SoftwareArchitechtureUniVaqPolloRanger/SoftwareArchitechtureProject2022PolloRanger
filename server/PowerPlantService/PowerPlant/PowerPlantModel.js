var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PowerPlantSchema = new Schema({
	'timestamp': Date,
	'hydro': {
		'power': Number,
		'cost': Number,
		'powerUnit': String,
		'costUnit': String
	},
	'solar': {
		'power': Number,
		'cost': Number,
		'powerUnit': String,
		'costUnit': String
	},
	'geothermal': {
		'power': Number,
		'cost': Number,
		'powerUnit': String,
		'costUnit': String
	},
	'fossilFuel': {
		'power': Number,
		'cost': Number,
		'powerUnit': String,
		'costUnit': String

	}
});

module.exports = mongoose.model('PowerPlant', PowerPlantSchema);
