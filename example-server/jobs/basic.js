const { parentPort } = require('worker_threads');

setTimeout(() => {
  parentPort.postMessage('basic run');
}, 1000);
