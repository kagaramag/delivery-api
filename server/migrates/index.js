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
      users(
        id SERIAL NOT NULL PRIMARY KEY,
        name character VARCHAR(255) NOT NULL,
        email character VARCHAR(255) UNIQUE NOT NULL,
        password character VARCHAR(255) NOT NULL,
        state character VARCHAR(255) NOT NULL,
        created_time timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_time timestamp DEFAULT CURRENT_TIMESTAMP,
        role numeric(11,0)
      )`;
(() => {
  pool.query(usersTable)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
})();

const parcelsTable = `CREATE TABLE IF NOT EXISTS
      parcels(
        id SERIAL PRIMARY KEY,
        title CHARACTER(128) UNIQUE NOT NULL,
        description CHARACTER(128) NOT NULL,
        weight CHARACTER(128) NOT NULL,
        state CHARACTER(255) NOT NULL,
        pickup CHARACTER(128) NOT NULL,
        dropoff CHARACTER(128) NOT NULL,
        distance INTEGER NOT NULL,
        id_client INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        role INTEGER NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT FALSE,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
(() => {
  pool.query(parcelsTable)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
})();
