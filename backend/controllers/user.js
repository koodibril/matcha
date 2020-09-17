const db = require('./neo4j');

exports.signup = (req, res, next) => {
	console.log('SIGNUP');
	console.log(req.body);
	db.register(req, res, next);
};

exports.login = (req, res, next) => {
	console.log('LOGIN');
	console.log(req.body);
	db.login(req, res, next);
};
