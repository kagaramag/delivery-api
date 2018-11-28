const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'gilles',
  host: 'localhost',
  database: 'sendit',
  password: 123123,
  port: 5432
});

export default pool;