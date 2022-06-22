import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Bree from 'bree';
import { plugin as apiPlugin } from '@breejs/api';

Bree.extend(apiPlugin, { jwt: false });

const bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), 'jobs'),
  timeout: 0,
  interval: 0,
  hasSeconds: false,
  defaultExtension: 'js'
});

bree.start().catch((err) => console.error(err));

export default bree;
