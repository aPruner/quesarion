const proxy = require('http-proxy-middleware').createProxyMiddleware;
const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler('index.html', {
  // Don't cache anything in development 
  cache: false,
});

const app = express();
const PORT = process.env.PORT || 1234;

app.use(
  '/api',
  proxy({
    target: process.env.API_SERVER || 'http://localhost:3001/'
  })
);

app.use(bundler.middleware());

app.listen(PORT);