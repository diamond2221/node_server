const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "981220Zy",
  port: 3306,
  database: "study"
});

module.exports = connection;
