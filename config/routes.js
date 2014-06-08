var index = require('../app/controllers/index');
var users = require('../app/controllers/users');
var board = require('../app/controllers/board');
var register = require('../app/controllers/register');

/*
 * Expose routes
 */
module.exports = function(app){
	
	app.use('/', index);
	app.use('/board', board);
	app.use('/register',register);
	
};