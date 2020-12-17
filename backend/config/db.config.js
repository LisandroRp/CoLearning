const mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host     : 'bacg4zbxzg6alxu9enoe-mysql.services.clever-cloud.com',
  user     : 'u05jlzimtwm0313g',
  password : 'OQFFBcxgBaXhjge8GSCH',
  port: '3306',
  database : 'bacg4zbxzg6alxu9enoe'
});

module.exports = {
  query: function(){
      var sql_args = [];
      var args = [];
      for(var i=0; i<arguments.length; i++){
          args.push(arguments[i]);
      }
      var callback = args[args.length-1]; //last arg is callback
      pool.getConnection(function(err, connection) {
      if(err) {
              console.log(err);
              return callback(err);
          }
          if(args.length > 2){
              sql_args = args[1];
          }
      connection.query(args[0], sql_args, function(err, results) {
        connection.release(); // always put connection back in pool after last query
        if(err){
                  console.log(err);
                  return callback(err);
              }
        callback(null, results);
      });
    });
  }
};
/**
 *local mysql db connection
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
 * 
 */
