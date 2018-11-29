/* Code modified from a file obtained from https://github.com/olawalejarvis/reflection_app_server */
import { Pool } from 'pg';
import dotenv from 'dotenv';

import pool from './../db/config';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
function query(text, params) {
  return new Promise((resolve, reject) => {
    pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export default {
  query,
};

const usersTable = `CREATE TABLE IF NOT EXISTS
      members(
        id UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        name VARCHAR(128) NOT NULL,
        role VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
(() => {
  pool.query(usersTable)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
})();

})();