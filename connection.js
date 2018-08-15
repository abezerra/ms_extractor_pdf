var mysql = require('mysql');
const { host, user, password } =   require('./mysqlEnvVars')
const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password
});

export default connection;
