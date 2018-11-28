import dotenv from "dotenv";
import { Pool } from "pg";
import dbConfig from "../database/database";
dotenv.config();
const env = process.env.NODE_ENV || "development";

const query = (text, params) => {
  const pool = new Pool({
    connectionString: dbConfig[env]
  });
  return new Promise((resolve, reject) => {
    pool
      .query(text, params)
      .then(response => {
        const { rows } = response;
        resolve(rows);
        pool.end();
      })
      .catch(err => {
        reject(err);
        pool.end();
      });
  });
};
const findById = (table, id) => {
  const pool = new Pool({
    connectionString: dbConfig[env]
  });
  const queryText = `
      SELECT *  FROM ${table} WHERE id = $1 LIMIT 1
    `;
  const values = [id];
  return new Promise((resolve, reject) => {
    pool
      .query(queryText, values)
      .then(response => {
        const { rows } = response;
        resolve(rows[0]);
        pool.end();
      })
      .catch(err => {
        reject(err);
        pool.end();
      });
  });
};

const createTable = commandDb => {
  const pool = new Pool({
    connectionString: dbConfig[env]
  });
  return new Promise((resolve, reject) => {
    pool
      .query(commandDb)
      .then(response => {
        resolve(response);
        pool.end();
      })
      .catch(err => {
        reject(err);
        pool.end();
      });
  });
};

export default { query, createTable, findById };