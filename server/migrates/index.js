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
        id SERIAL PRIMARY KEY,
        email CHARACTER(128) UNIQUE NOT NULL,
        name CHARACTER(128) NOT NULL,
        role CHARACTER(128) NOT NULL,
        password CHARACTER(128) NOT NULL,
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
