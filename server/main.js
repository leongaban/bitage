/* =========================================
   SERVER
   ========================================= */

// set up ======================================================================
// get all the tools we need
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

	accountsController = require('./controllers/accounts-controller.js');

// Express router
var router 		 = express.Router();

// configuration ===============================================================
// mongoose.connect('mongodb://users:leonardo2016!@kahana.mongohq.com:10016/sandbox');
// mongoose.connect('mongodb://node:noder@novus.modulusmongo.net:27017/Iganiq8o');


// loading static and bower components ===================
app.use(express.static(__dirname + '../client'));
// app.use('../client/',  express.static(__dirname + '../client/website'));
// app.use('../client/bower_components',  express.static(__dirname + '../client/bower_components'));

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', '../client');
app.set('view engine', 'hbs'); // set up hbs for templating
app.engine('hbs', cons.handlebars);

// required for passport
app.use(session({ secret: 'itisalwayssunnyinphilly@21!6' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// The Bitage Website:
// app.use(express.static(__dirname, '../client/website'));
// app.use('../client/',  express.static(__dirname + '../client/website'));

// The Bitage Dashboard:
// app.use(express.static(__dirname + '../client/dashboard'));


// routes ======================================================================
// require('./routes/routes.js')(app, passport);
// load our routes and pass in our app and fully configured passport

// from MEAN Machine:
// var dashRouter = require('./routes/routes')(app, express);
// app.use('/dashboard', dashRouter);

//website api ==================================================================
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

// API to add new accounts:
app.post('/api/accounts', accountsController.create);


// launch ======================================================================
// app.listen(port);
// console.log('Server running at ' + port);

// Start server
app.listen(config.port, function () {
  console.log('Server listening on %d, in %s mode', config.port, config.env);
});

// Expose app
exports = module.exports = app;
