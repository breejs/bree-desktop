import process from 'node:process';
import readline from 'node:readline';
import path from 'node:path';

import Bree from 'bree';
import { EVENTS_MAP } from './constants';

export class App {
  constructor() {
    // setup bree config
    this.setBreeConfig();

    // bindings
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);

    this._write = this._write.bind(this);
    this.log = this.log.bind(this);

    this.setBreeConfig = this.setBreeConfig.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.workerMessageHandler = this.workerMessageHandler.bind(this);
    this.setupListeners = this.setupListeners.bind(this);
    this.startBree = this.startBree.bind(this);
    this.stopBree = this.stopBree.bind(this);
  }

  start() {
    if (this.rl) {
      return;
    }

    // create readline interface
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: ''
    });
    this.setupListeners();
  }

  async stop() {
    if (this.rl) {
      this.rl.close();
      this.rl.removeAllListeners();
      this.rl = undefined;
    }

    if (this.bree) {
      await this.stopBree();
    }
  }

  /**
   * output functions
   */
  _write(msg) {
    console.log(JSON.stringify(msg));
  }

  log(msg) {
    this._write({ event: 'log', data: msg });
  }

  /**
   * Bree functions
   */
  setBreeConfig(config = {}) {
    this.breeConfig = {
      root: path.join(import.meta.url, '../jobs'),
      logger: false,
      workerMetadata: true,
      jobs: [{ name: 'basic', interval: 5000 }],

      ...config,

      // do these after config merge to ensure they are set correctly
      errorHandler: this.errorHandler,
      workerMessageHandler: this.workerMessageHandler
    };
  }

  errorHandler(error, workerMetadata) {
    this._write({
      event: 'worker-error',
      data: { error, workerMetadata }
    });
  }

  workerMessageHandler(message, workerMetadata) {
    this._write({
      event: 'worker-message',
      data: { message, workerMetadata }
    });
  }

  startBree() {
    if (this.bree) {
      return;
    }

    this.bree = new Bree(this.breeConfig);

    // setup worker listeners
    this.bree.on('worker created', (name) => {
      this._write({ event: 'worker-created', data: { name } });
    });
    this.bree.on('worker deleted', (name) => {
      this._write({ event: 'worker-deleted', data: { name } });
    });

    this.bree.start();
    this.log('bree started');
  }

  async stopBree() {
    if (this.bree) {
      await this.bree.stop();
      this.bree.removeAllListeners();
      this.bree = undefined;
    }
  }

  setupListeners() {
    this.rl.on('line', (input) => {
      const payload = JSON.parse(input);
      const { event, data } = payload;

      if (EVENTS_MAP.has(event)) {
        this[EVENTS_MAP.get(event)](data);
      } else {
        console.error('Unexpected input', data);
      }
    });
  }

  //
  // readline event listener functions
  //
  getConfig() {
    this._write({ event: 'config', data: this.breeConfig });
  }
}

const app = new App();
export default app;
