var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PowerDistributionSchema = new Schema({
	'timestamp' : Date,
	'residentialAreaSupply' : Number,
	'officeSupply' : Number,
	'industrialSupply' : Number,
	'cost' : Number
});

module.exports = mongoose.model('PowerDistribution', PowerDistributionSchema);
