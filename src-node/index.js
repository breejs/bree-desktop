/* eslint-disable import/first */
require('source-map-support').install();

import Graceful from '@ladjs/graceful';

import app from './app';

const graceful = new Graceful({
  customHandlers: [app.stop]
});
graceful.listen();

app.start();
app.setBreeConfig({ root: '/Users/taylorschley/Documents/jobs' });
app.startBree();
