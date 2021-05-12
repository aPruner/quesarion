require('dotenv').config();
const express = require('express');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
const passport = require('passport');
const handlers = require('./backend/handlers');
const { getDbClientAndConnect } = require('./backend/db/client');
const { usePassportLocalStrategy } = require('./backend/auth');

const app = express();
const port = 3001;

getDbClientAndConnect().then((dbClient) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(expressSession);
  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/query', handlers.createQueryHandler(dbClient));

  // Auth handlers
  app.post('/signup', handlers.createSignupHandler(dbClient));
  usePassportLocalStrategy(passport, dbClient);
  app.post(
    '/login',
    passport.authenticate('local', {}),
    handlers.createLoginHandler(passport)
  );

  app.listen(process.env.PORT || port, () => {
    console.log(
      `Quesarion backend server listening at http://localhost:${port}`
    );
  });
});
