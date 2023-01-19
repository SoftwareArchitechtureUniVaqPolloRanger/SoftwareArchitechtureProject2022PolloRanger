const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UnusedStorageServiceSchema = new Schema({
	'power' : Number,
	'unit':String,
	timestamps: Date
},{timestamps : true});

module.exports = mongoose.model('UnusedStorageService', UnusedStorageServiceSchema);

