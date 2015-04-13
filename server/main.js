/* =============================================================================
   SERVER
   ========================================================================== */

var express  	 = require('express'),
	app      	 = express(),
	port     	 = process.env.PORT || 9999,
	mongoose 	 = require('mongoose'),
	passport 	 = require('passport'),
	flash    	 = require('connect-flash'),
	hbs 	 	 = require('handlebars'),
	cons 	 	 = require('consolidate'),
	bitcoin  	 = require('bitcoinjs-lib'),
	moment 		 = require('moment'),
	morgan       = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser   = require('body-parser'),
	session      = require('express-session'),
	configDB 	 = require('./config/database.js'),
	config 	   	 = require('./config/config'),
	acctCtrl 	 = require('./controllers/accounts-controller.js');

//Use YOUR Firebase URL (not the one below)
var fb = new Firebase("https://bitage.firebaseio.com");

var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator 		   = new FirebaseTokenGenerator("<YOUR_FIREBASE_SECRET>");
var token 				   = tokenGenerator.createToken({uid: "1", some: "arbitrary", data: "here"});

// Express router
var router 		 = express.Router();

// configuration ===============================================================
// mongoose.connect('mongodb://users:leonardo2016!@kahana.mongohq.com:10016/sandbox');
// mongoose.connect('mongodb://node:noder@novus.modulusmongo.net:27017/Iganiq8o');

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); 	// log every request to the console
app.use(cookieParser()); 	// read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', '../client');
app.set('view engine', 'hbs');
app.engine('hbs', cons.handlebars);

// required for passport
app.use(session({ secret: 'itisalwayssunnyinphilly@21!6' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// website api =================================================================
var website = express.Router();
app.use('/', website);
app.use('/', express.static("../client/"));
console.log(__dirname + "../client/");

website.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

website.get('/', function(req, res) {
	var path = 'index.html';
	res.sendfile(path, { 'root': '../client/website/' });
});

//dashboard api ================================================================
var dashboard = express.Router();
app.use('/dashboard', dashboard);

dashboard.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

dashboard.get('/dashboard', function(req, res) {
	var path = 'index.html';
	res.sendfile(path, { 'root': '../client/dashboard/' });
});

// Dashboard API to get all accounts:
app.get('/api/accounts/all', acctCtrl.all);

// Dashboard API to add new accounts:
app.post('/api/accounts/save', acctCtrl.create);

// Dashboard API to update account:
app.post('/api/accounts/update', acctCtrl.update);

// Dashboard API to delete account:
app.delete('/api/accounts/delete', acctCtrl.delete);

// Start server ================================================================
app.listen(config.port, function () {
  console.log('Server listening on %d, in %s mode', config.port, config.env);
});

// Expose app
exports = module.exports = app;
