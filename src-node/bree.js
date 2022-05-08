import path from 'node:path';

import Bree from 'bree';

const bree = new Bree({
  root: path.resolve(import.meta.url, 'jobs'),
  logger: false,
  jobs: [{ name: 'basic', interval: 1000 }]
});

export default bree;
