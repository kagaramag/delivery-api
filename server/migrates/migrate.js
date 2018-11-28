import db from "./index";

const postsTable = `
DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE IF NOT EXISTS posts(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  created_at TIMESTAMP
);`;
// const usersTable = `
// DROP TABLE IF EXISTS users CASCADE;
// CREATE TABLE IF NOT EXISTS users(
//   id SERIAL PRIMARY KEY, 
//   first_name TEXT NOT NULL, 
//   last_name TEXT NOT NULL, 
//   email TEXT NOT NULL UNIQUE, 
//   password TEXT NOT NULL, is_admin
//   BOOLEAN NOT NULL DEFAULT FALSE, 
//   created_at TIMESTAMP
// );`;

// setTimeout(() => { 
// db.createTable(usersTable)
// .then(res => console.log("users table created")).catch(err => err)
// }, 300);

setTimeout(() => {
  db.createTable(postsTable)
    .then(res => console.log("posts table created"))
}, 1000);