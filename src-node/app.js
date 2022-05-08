import App from 'koa';
import Cabin from 'cabin';
import sse from 'koa-sse-stream';
import cors from '@koa/cors';

import bree from './bree';
import router from './routes';
import { breeEvents } from './controllers/server-sent-events';

const cabin = new Cabin({
  logger: console,
  capture: false
});

// initialize apps
const app = new App();

app.context.bree = bree;

// listen for errors
app.on('error', (err, ctx) => {
  const level = err.status && err.status < 500 ? 'warn' : 'error';
  if (ctx.logger) ctx.logger[level](err);
  else cabin[level](err);
});
app.on('log', cabin.log);

// use the cabin middleware (adds request-based logging and helpers)
app.use(cabin.middleware);

// cors
app.use(cors());

// setup sse
app.use(
  sse({
    maxClients: 10
  })
);

// routes
app.use(router.routes());

// setup bree events
app.use(breeEvents);

export default app;
