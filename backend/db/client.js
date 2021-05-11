const knex = require('knex');

const getDbClientAndConnect = async () => {
  const dbClient = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex', 'public']
  });
  return dbClient;
};

module.exports = {
  getDbClientAndConnect
};
