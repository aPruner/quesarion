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
const localStrategy = require('passport-local').Strategy;

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
  app.post('/login', handlers.createLoginHandler());
  app.post('/signup', handlers.createSignupHandler(dbClient));

  app.listen(process.env.PORT || port, () => {
    console.log(
      `Quesarion backend server listening at http://localhost:${port}`
    );
  });
});
