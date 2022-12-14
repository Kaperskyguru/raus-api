require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "Changeless11!",
    database: process.env.DB_NAME || "profaili-api-db",
    host: process.env.DB_HOSTNAME || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "postgres",
  },

  test: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "Changeless11!",
    database: process.env.DB_NAME || "profaili-api-db",
    host: process.env.DB_HOSTNAME || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "postgres",
  },

  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_DIALECT || "postgres",
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  },
  use_env_variable: process.env.DATABASE_URL || null,
};
