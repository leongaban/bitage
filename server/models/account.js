var mongoose = require('mongoose');

module.exports = mongoose.model('Account', {
	label: String,
	address: String
})