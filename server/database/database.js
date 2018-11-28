import dotenv from "dotenv";

dotenv.config();
export default {
  development: process.env.DATABASE_URL
};