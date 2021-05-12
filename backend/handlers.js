const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {
  beginTransaction,
  commitTransaction,
  doSimpleQuery
} = require('./db/queries');
const { hashPassword } = require('./auth');

const createLoginHandler = () => {
  return passport.authenticate('local', {}, (req, res) => {
    if (req.body.remember) {
      // The cookie will expire after 30 days
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
      // The cookie will expire at the end of the session
      req.session.cookie.expires = false;
    }
    res.send({ message: 'Youre now logged in!' });
  });
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
      await beginTransaction(dbClient);
      const hashedPassword = await hashPassword(req.body.password, 5);
      const selectUsersQueryRes = await dbClient.raw(
        'SELECT id FROM "users" WHERE "email" = ?',
        [req.body.email]
      );
      if (selectUsersQueryRes.rows[0]) {
        res.status(400);
        res.send({ message: 'Sorry, this user is signed up already!' });
        return;
      } else {
        await dbClient.raw(
          'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
          [uuidv4(), req.body.username, req.body.email, hashedPassword]
        );
        await commitTransaction(dbClient);
        console.log('NEW USER INSERTED INTO DB SUCCESS');
        res.status(200);
        res.send({ message: 'NEW USER INSERTED INTO DB SUCCESS' });
      }
    } catch (e) {
      console.log(e);
      res.status(500);
      res.send({ errorMessage: e });
      throw e;
    }
  };
};

module.exports = {
  createLoginHandler,
  createQueryHandler,
  createSignupHandler
};
