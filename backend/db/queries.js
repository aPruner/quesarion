const doSimpleQuery = async (dbClient) => {
  return dbClient.query('SELECT NOW()');
};

module.exports = {
  doSimpleQuery
};