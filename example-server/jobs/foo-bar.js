const { parentPort } = require('worker_threads');

setTimeout(() => {
  parentPort.postMessage('long run');
}, 100_000);
