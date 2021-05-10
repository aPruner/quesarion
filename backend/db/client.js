const { Client } = require('pg');

const getDbClientAndConnect = async () => {
  const client = await new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
  });
  client.connect();
  return client;
};

module.exports = {
  getDbClientAndConnect
};
