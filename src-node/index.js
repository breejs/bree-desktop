/* eslint-disable import/first */
require('source-map-support').install();

import Graceful from '@ladjs/graceful';

import bree from './bree';
import app from './app';

const graceful = new Graceful({
  brees: [bree],
  servers: [app]
});
graceful.listen();

bree.start();

console.log('Bree started');

app.listen(3001);

console.log('Api started');
