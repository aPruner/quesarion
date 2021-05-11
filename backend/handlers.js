const { v4: uuidv4 } = require('uuid');

const { beginTransaction, doSimpleQuery } = require('./db/queries');
const { hashPassword } = require('./auth');

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

const createSignupHandler = (dbClient) => {
  return async (req, res) => {
    try {
      beginTransaction(dbClient);
      const hashedPassword = hashPassword(req.body.password, 5);
      const selectUsersQueryRes = await dbClient.raw(
        'SELECT id FROM "users" WHERE "email"=$1',
        [req.body.email]
      );
      if (selectUsersQueryRes.rows[0]) {
        res.status(400);
        return { message: 'Sorry, this user is signed up already!' };
      } else {
        const insertNewUserQueryRes = dbClient.raw(
          'INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4, $5)',
          [uuidv4(), req.body.username, req.body.email, hashedPassword]
        );
        console.log('NEW USER INSERTED INTO DB SUCCESS', insertNewUserQueryRes);
        res.status(200);
        return;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

module.exports = {
  createLoginHandler,
  createQueryHandler,
  createSignupHandler
};
