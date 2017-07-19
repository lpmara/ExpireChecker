var mysql = require('mysql');
var config = require('./config.json');

class Database {

	constructor() {
		const connection = {
			connectionLimit: config.connectionLimit,
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database,
			port: config.port
		};
		this.getConnection = mysql.createPool(connection);
	}
	execQuery(SQL, arrParam) {
		var promise = new Promise((resolve, reject) => {
			this.getConnection.query(SQL, arrParam, (err, rows) => {
				if (err) {
					return new Promise((resolve, reject) => { reject({ message: 'this is INSANEEEEEE', result: false }) });
					
				} else {

					if (rows.length !== 0) {
						rows = JSON.parse(JSON.stringify(rows));
						resolve(rows);
					} else {
						if(reject) {
							reject(undefined);
						}
						
					}
				}
			});
		});

		return promise;
	}
}

Database.getInstance = () => {
	if (this.instance == null) {
		this.instance = new Database();
	}
	return this.instance;
};


module.exports = Database.getInstance();


