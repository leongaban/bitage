var express = require('express');
var path 	= require('path');

module.exports = function(app, passport) {

	// Routers
	var dashRouter = express.Router();

	dashRouter.use(express.static(__dirname + '../client/dashboard'));

	// ADMIN ROUTES -------------------------------
	dashRouter.use(function(req, res, next) {
		console.log(req.method, req.url);

		next();
	});

	dashRouter.get('/', function(req, res) {

		// res.send('dashboard!');
		// res.sendFile(path.join(__dirname + '../client/dashboard/index.html'));
		// res.sendFile('index.html');
		console.log(res);
		res.sendStatus(500);

		// var fileName = 'index.html';

		// var options = {
		// 	root: __dirname + '../client/dashboard/',
		// 	dotfiles: 'deny',
		// 	headers: {
		// 	    'x-timestamp': Date.now(),
		// 	    'x-sent': true
		// 	}
		// };

		// res.sendFile(fileName, options, function (err) {
		// 	if (err) {
		// 		console.log(err);
		// 		res.status(err.status).end();
		// 	}
		// 	else {
		// 		console.log('Sent:', fileName);
		// 	}
		// });
	});

	return dashRouter;
};