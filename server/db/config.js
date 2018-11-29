const { Pool, Client } = require('pg')
require('dotenv').config();


let config;
if(process.env.NODE_ENV === 'production'){ 
  const url = require('url');
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');
   
  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };
   
}else if(process.env.NODE_ENV === 'test'){
  config = {
    user:process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password:process.env.PG_PASSWORD,
    port: process.env.PG_PORT
  };

}
// console.log(config);
const pool = new Pool(config);
export default pool;