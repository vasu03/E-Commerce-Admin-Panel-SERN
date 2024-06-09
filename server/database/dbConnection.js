// Imorting the required modules
import mysql from "mysql2";

// Importing and configuring the .env file
import dotenv from "dotenv";
dotenv.config({ path: "config.env" });

// Creating a connection pool to our database
const sqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exporting our connection pool
export default sqlPool;