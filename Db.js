const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({//this is creating connection withdatabase
  host: 'localhost', // Replace with your MySQL host
  user: 'root', // Replace with your MySQL username
  password: 'root', // Replace with your MySQL password
  database: 'reactdb', // Replace with your MySQL database name
  connectionLimit: 10,
});

module.exports = pool.promise();
