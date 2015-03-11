var Account = require('../models/account');

module.exports = {
	all: function(req, res) {
		console.log('get all accounts');
		console.log(res.body);
	},

	create: function(req, res) {
		console.log('create new account:');
		console.log(req.body);
		var account = new Account(req.body);
		account.save();
	},
	    
	update: function(req, res) {
		console.log('update account:');
		console.log(req.body);
	},

	delete: function(req, res) {
		console.log('delete account:');
		console.log(req.body);
	}
};