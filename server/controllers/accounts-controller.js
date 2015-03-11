var Account = require('../models/account');

module.exports = {
	all: function(req, res) {
		console.log(req.body);
	},

	create: function(req, res) {
		console.log('create:');
		console.log(req.body);
		var account = new Account(req.body);
		account.save();
	},
	    
	update: function(req, res) {
		console.log('update:');
		console.log(req.body);
	},

	delete: function(req, res) {
		console.log('delete:');
		console.log(req.body);
	}
};