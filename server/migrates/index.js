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
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT false,
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
        title VARCHAR(128) NOT NULL,
        description VARCHAR(128) NOT NULL,
        weight NUMERIC(128) NOT NULL,
        state VARCHAR(255) NOT NULL,
        pickup VARCHAR(128) NOT NULL,
        dropoff VARCHAR(128) NOT NULL,
        distance NUMERIC(16) NOT NULL,
        id_client NUMERIC(16) NOT NULL,
        created_time timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_time timestamp DEFAULT CURRENT_TIMESTAMP
      )`;
(() => {
  pool.query(parcelsTable)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
})();


const parcelsTable = `CREATE TABLE IF NOT EXISTS
      locations(
        id SERIAL NOT NULL PRIMARY KEY,
        longitude VARCHAR(255) NOT NULL,
        latitude VARCHAR(255) NOT NULL,
        id_parcel INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        message VARCHAR(600),  
        created_date TIMESTAMP
      )`;
(() => {
  pool.query(parcelsTable)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
})();


