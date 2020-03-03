/* eslint-disable */
require('regenerator-runtime/runtime');
const server = require('@umijs/server');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const { join, extname } = require('path');
/* eslint-enable */

const isDev = process.env.NODE_ENV === 'development';

const root = join(__dirname, 'dist');
const render = server({
  root,
  polyfill: false,
  dev: isDev,
});

const app = express();
app.use(compression());
app.use(helmet());
app.use('/', express.static(root));

app.get('*', async (req, res, next) => {
  const ext = extname(req.path);
  if (!ext) {
    const { ssrHtml } = await render({
      req: {
        url: req.originalUrl,
      },
    });
    res.type('html');
    res.status(200).send(ssrHtml);
  } else {
    next();
  }
});

app.listen(8285);

module.exports = app;
