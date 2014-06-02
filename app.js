/*
 * Modules dependencyis 
 */
var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/*
 * Environment server
 */
var env = process.env.NODE_ENV || 'development';

/*
 * Load configurations
 */
var config = require('./config/config')[env];
/*
 * Bootstrap db connection connect to mongodb
 */
var connect = function() {
	var options = {
		server : {
			socketOptins : {
				keepAlive : 1
			}
		}
	};
	mongoose.connect(config.mongodb, options);
};

connect();
/*
 * Mongodb connection error handler
 */
mongoose.connection.on('error', function(err) {
	console.log(err);
});

/*
 * Mongodb reconnection when connection close
 */
mongoose.connection.on('disconnected', function() {
	connect();
});

/*
 * Bootstrap models
 */

var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(files_name) {
	if (~filename.indexOf('.js')) {
		require(models_path + '/' + files_name);
	}
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));



/*
 * Bootstrap rountes
 */
require('./config/routes')(app);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
