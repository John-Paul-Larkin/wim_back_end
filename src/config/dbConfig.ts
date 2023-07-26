import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

console.info('process.env.DB_PASSWORD was ' + (!process.env.DB_PASSWORD ? 'NOT ' : '') + 'set')

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '123456',
  // port: parseInt(process.env.PORT || "", 10),
  port: 3306,
  database: process.env.DB_NAME,
});

export default pool;
