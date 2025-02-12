const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: "mysql",
    connection: {
      host: env("DATABASE_HOST"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME"),
      user: env("DATABASE_USERNAME"),
      password: env("DATABASE_PASSWORD"),
      ssl: env.bool("DATABASE_SSL", false) ? { rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", false) } : false,
    },
    useNullAsDefault: true, // 🔹 Fix transaction issue with MySQL
    pool: { min: 0, max: 10 }, // 🔹 Prevent connection issues
    acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
  },
});

