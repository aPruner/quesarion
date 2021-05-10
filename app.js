require('dotenv').config();
const express = require('express');
const handlers = require('./backend/handlers');
const { getDbClientAndConnect } = require('./backend/db/client');

const app = express();
const port = 3001;

getDbClientAndConnect().then((dbClient) => {
  app.get('/login', handlers.createLoginHandler());
  app.get('/query', handlers.createQueryHandler(dbClient));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
