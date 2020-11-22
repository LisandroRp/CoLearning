const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'bacg4zbxzg6alxu9enoe-mysql.services.clever-cloud.com',
   user     : 'u05jlzimtwm0313g',
   password : 'OQFFBcxgBaXhjge8GSCH',
   port: '3306',
   database : 'bacg4zbxzg6alxu9enoe'
  //host     : 'localhost',
  //user     : 'root',
  //password : '',
  //database : 'colearning_db'
});
dbConn.connect(function(err) {
  if (err) {
    console.log(err);
    throw err;}
  console.log("Database Connected!");
});
module.exports = dbConn;
