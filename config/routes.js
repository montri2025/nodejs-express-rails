var index = require('../app/controllers/index');
var users = require('../app/controllers/users');

/*
 * Expose routes
 */
module.exports = function(app){
	
	app.use('/', index);
	app.use('/users', users);
	
};