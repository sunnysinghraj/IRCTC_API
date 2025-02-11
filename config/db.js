
import pkg from 'pg';  // Import the pg package as the default export
const { Pool } = pkg;  // Destructure Pool from the imported pkg
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password:process.env.PASSWORD,
  port: process.env.PORT
});
export default pool;
