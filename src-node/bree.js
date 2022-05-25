import path from 'node:path';

import Bree from 'bree';

import messenger from './messenger';

const bree = new Bree({
  root: path.resolve(import.meta.url, 'jobs'),
  logger: false,
  workerMetadata: true,
  jobs: [{ name: 'basic', interval: 5000 }],
  errorHandler(error, workerMetadata) {
    messenger.write({ event: 'worker-error', data: { error, workerMetadata } });
  },
  workerMessageHandler(message, workerMetadata) {
    messenger.write({
      event: 'worker-message',
      data: { message, workerMetadata }
    });
  }
});

bree.on('worker created', (name) => {
  messenger.write({ event: 'worker-created', data: { name } });
});

bree.on('worker deleted', (name) => {
  messenger.write({ event: 'worker-deleted', data: { name } });
});

export default bree;
