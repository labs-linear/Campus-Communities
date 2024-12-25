const mysql = require("mysql2");
const config = require("./mysqlconfig");

const connectDB = async () => {
  const pool = mysql.createPool(config);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      return; // Exit early if there's an error
    }

    console.log("Connected to MySQL database");

    // Safely release the connection if it exists
    if (connection) {
      connection.release();
    }
  });
};

module.exports = connectDB;