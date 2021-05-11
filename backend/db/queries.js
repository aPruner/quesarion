const doSimpleQuery = async (dbClient) => {
  return dbClient.raw('SELECT NOW()');
};

module.exports = {
  doSimpleQuery
};
