const doSimpleQuery = async (dbClient) => {
  return dbClient.raw('SELECT NOW()');
};

const beginTransaction = async (dbClient) => {
  return dbClient.raw('BEGIN');
};

const commitTransaction = async (dbClient) => {
  return dbClient.raw('COMMIT');
};

module.exports = {
  beginTransaction,
  commitTransaction,
  doSimpleQuery
};
