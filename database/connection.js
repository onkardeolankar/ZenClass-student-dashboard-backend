let mongoose = require('mongoose');
let { dbConfig } = require('./db');

exports.connection = () => {
	mongoose.Promise = global.Promise;
	mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => {
			console.log('Database sucessfully connected!')
		})
		.catch((error) => {
			console.log('Could not connect to database:' + error);
		})
}
