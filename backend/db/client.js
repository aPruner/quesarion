const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../../knexfile')[environment];

const getDbClientAndConnect = async () => {
  const dbClient = require('knex')(knexConfig);
  return dbClient;
};

module.exports = {
  getDbClientAndConnect
};
