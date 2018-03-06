import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as compress from 'koa-compress';
import * as json from 'koa-json';
import * as bodyparser from 'koa-bodyparser';
import * as statics from 'koa-static';
import * as path from 'path';
import renderPage from './renderPage';
import onerror from 'koa-onerror';
// get logger
import getLogger from './common/logger';
// apis
import users from './api/users';

// app
const app = new Koa();

// router
const router = new Router();

// log4js
const logger = getLogger('app');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  // multipart: true,
  enableTypes: ['json', 'form', 'text']
}));

// compress
app.use(compress({
  filter(contentType: any) {
    // html css / js / json
    return /text|javascript|json/i.test(contentType);
  },
  threshold: 1024, // 大于1kb开启压缩
  flush: require('zlib').Z_SYNC_FLUSH
}));

// json
app.use(json());

// static
app.use(statics(path.join(__dirname, '../../dist/client')));

// logger
app.use(async (ctx, next) => {
  try {
    const start = + new Date();
    await next();
    const ms = + new Date() - start;
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
  } catch (error) {
    logger.error(error);
    throw error;
  }
});

// apis
app.use(users.routes());

// render
app.use(router.get('*', async (ctx) => {
  ctx.body = await renderPage(ctx);
})
  .middleware());

export default app;
