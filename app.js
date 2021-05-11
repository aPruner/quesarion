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

const app = express();
const port = 3001;

getDbClientAndConnect().then((dbClient) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(expressSession);
  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/login', handlers.createLoginHandler());
  app.get('/query', handlers.createQueryHandler(dbClient));

  app.listen(process.env.PORT || port, () => {
    console.log(
      `Quesarion backend server listening at http://localhost:${port}`
    );
  });
});
