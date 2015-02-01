// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 9876;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var hbs = require('handlebars');
var cons = require('consolidate');
var bitcoin = require('bitcoinjs-lib');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// Express router
var router = express.Router();

// configuration ===============================================================
mongoose.connect('mongodb://users:leonardo2016!@kahana.mongohq.com:10016/sandbox'); // connect to our database


// loading static and bower components ===================
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating
app.engine('hbs', cons.handlebars);

// required for passport
app.use(session({ secret: 'itisalwayssunnyinphilly@21!6' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// connecting the #account app
app.use('/dashboard', router);

// The Angular App itself below
app.use(express.static(__dirname + '/dashboard'));

app.get('/blog', function(req,res) {});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// launch ======================================================================
app.listen(port);
console.log('Server running at ' + port);
