const doSimpleQuery = async (dbClient) => {
  return dbClient.raw('SELECT NOW()');
};

const beginTransaction = async (dbClient) => {
  return dbClient.raw('BEGIN');
};

module.exports = {
  beginTransaction,
  doSimpleQuery
};
