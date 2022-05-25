/* eslint-disable import/first */
require('source-map-support').install();

import Graceful from '@ladjs/graceful';

import bree from './bree';
import messenger from './messenger';

const graceful = new Graceful({
  brees: [bree],
  customHandlers: [messenger.stop]
});
graceful.listen();

messenger.start();

messenger.log('Messenger started');

bree.start();

messenger.log('Bree started');
