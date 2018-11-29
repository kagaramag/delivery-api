const { Pool, Client } = require('pg')
require('dotenv').config();

const pool = new Pool({
  user:process.env.USER_DB,
  host: 'localhost',
  database: process.env.DATABASE || postges,
  password:process.env.PASSWORD_DB,
  port: 5432
});

export default pool;