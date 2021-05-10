const { doSimpleQuery } = require('./db/queries');

const createLoginHandler = () => {
  return (req, res) => {
    res.send({ message: 'log in!' });
  };
};

const createQueryHandler = (dbClient) => {
  return (req, res) => {
    doSimpleQuery(dbClient)
      .then((queryRes) => {
        res.send({ time: queryRes.rows[0].now });
      })
      .catch((e) => console.log(e));
  };
};

module.exports = {
  createLoginHandler,
  createQueryHandler
};
