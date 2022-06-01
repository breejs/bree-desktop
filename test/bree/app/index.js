//
// core app function tests
//

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import Bree from 'bree';

import { App } from '../../../src-node/app';
import { EVENTS_MAP } from '../../../src-node/constants';

const JOBS_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../jobs'
);

// mock bree
// implementation can be found at '<root>/__mocks__/bree.js'
vi.mock('bree');

describe('App', () => {
  test('should construct', () => {
    expect(new App()).toBeDefined();
  });

  beforeEach((ctx) => {
    ctx.app = new App();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should mock bree', async () => {
    expect(Bree.mock).toBeDefined();
  });

  describe('start', () => {
    test('should be defined', ({ app }) => {
      expect(app.start).toBeDefined();
    });

    test('should create readline', ({ app }) => {
      app.start();

      expect(app.rl).toBeDefined();
    });

    test('should only create readline once', ({ app }) => {
      app.start();

      const rl = app.rl;

      app.start();

      expect(app.rl).toBe(rl);
    });
  });

  describe('stop', () => {
    beforeEach((ctx) => {
      ctx.app.setBreeConfig({ root: JOBS_PATH });
      ctx.app.start();
    });

    test('should be defined', ({ app }) => {
      expect(app.stop).toBeDefined();
    });

    test('should close rl', async ({ app }) => {
      expect(app.rl).toBeDefined();

      await app.stop();

      expect(app.rl).toBeUndefined();
    });

    test('should stop bree', async ({ app }) => {
      app.startBree();

      await app.stop();

      expect(app.bree).toBeUndefined();
    });
  });

  describe('_write', () => {
    beforeEach((ctx) => {
      vi.stubGlobal('console', { log: vi.fn() });
      ctx.consoleSpy = vi.spyOn(console, 'log');
    });

    test('should be defined', ({ app }) => {
      expect(app._write).toBeDefined();
    });

    test('should print object', ({ app, consoleSpy }) => {
      const data = { data: 'data' };
      app._write({ data: 'data' });

      expect(consoleSpy).toHaveBeenCalledOnce();
      expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify(data));
    });
  });

  describe('log', () => {
    beforeEach((ctx) => {
      ctx.writeSpy = vi.spyOn(ctx.app, '_write').mockImplementation(() => {});
    });

    test('should be defined', ({ app }) => {
      expect(app.log).toBeDefined();
    });

    test('should write log object', ({ app, writeSpy }) => {
      app.log('test');

      expect(writeSpy).toHaveBeenCalledOnce();
      expect(writeSpy.calls[0][0]).toEqual({ event: 'log', data: 'test' });
    });
  });

  describe('setBreeConfig', () => {
    test('should be defined', ({ app }) => {
      expect(app.setBreeConfig).toBeDefined();
    });

    test('should modify bree config', ({ app }) => {
      app.setBreeConfig({ path: JOBS_PATH });

      expect(app.breeConfig.path).toEqual(JOBS_PATH);
    });
  });

  describe('errorHandler', () => {
    beforeEach((ctx) => {
      ctx.writeSpy = vi.spyOn(ctx.app, '_write').mockImplementation(() => {});
    });

    test('should be defined', ({ app }) => {
      expect(app.errorHandler).toBeDefined();
    });

    test('should write event', ({ app, writeSpy }) => {
      const error = 'error';
      const workerMetadata = 'workerMetadata';

      app.errorHandler(error, workerMetadata);

      expect(writeSpy).toHaveBeenCalledOnce();
      expect(writeSpy.calls[0][0]).toEqual({
        event: 'worker-error',
        data: { error, workerMetadata }
      });
    });
  });

  describe('workerMessageHandler', () => {
    beforeEach((ctx) => {
      ctx.writeSpy = vi.spyOn(ctx.app, '_write').mockImplementation(() => {});
    });

    test('should be defined', ({ app }) => {
      expect(app.workerMessageHandler).toBeDefined();
    });

    test('should write event', ({ app, writeSpy }) => {
      const message = 'message';
      const workerMetadata = 'workerMetadata';

      app.workerMessageHandler(message, workerMetadata);

      expect(writeSpy).toHaveBeenCalledOnce();
      expect(writeSpy.calls[0][0]).toEqual({
        event: 'worker-message',
        data: { message, workerMetadata }
      });
    });
  });

  describe('setupListeners', () => {
    beforeEach((ctx) => {
      ctx.app.start();
    });

    test('should be defined', ({ app }) => {
      expect(app.setupListeners).toBeDefined();
    });

    test('should attach line listener', ({ app }) => {
      expect(app.rl.listeners('line').length).toBe(1);
    });

    test('should log error if unexpected input type', ({ app }) => {
      vi.stubGlobal('console', { error: vi.fn(), log: vi.fn() });
      const consoleSpy = vi.spyOn(console, 'error');

      app.rl.emit('line', JSON.stringify('test'));

      expect(consoleSpy).toHaveBeenCalledOnce();
    });

    for (const [event, fn] of EVENTS_MAP) {
      test(`should call "${fn}" when "${event}" is received`, ({ app }) => {
        const spy = vi.spyOn(app, fn).mockImplementation(() => {});

        app.rl.emit('line', JSON.stringify({ event, data: {} }));

        expect(spy).toHaveBeenCalledOnce();
      });
    }
  });

  describe('startBree', () => {
    beforeEach((ctx) => {
      ctx.app.setBreeConfig({ root: JOBS_PATH });
    });

    test('should be defined', ({ app }) => {
      expect(app.startBree).toBeDefined();
    });

    test('should start bree', ({ app }) => {
      expect(app.bree).not.toBeDefined();

      app.startBree();

      expect(Bree.mock.results[0].value).toBe(app.bree);
      expect(app.bree.start).toHaveBeenCalledOnce();
    });

    test('should not restart bree if it is already started', ({ app }) => {
      app.startBree();
      app.startBree();

      expect(Bree.mock.results[0].value).toBe(app.bree);
      expect(app.bree.start).toHaveBeenCalledOnce();
    });
  });

  describe('stopBree', () => {
    beforeEach((ctx) => {
      ctx.app.setBreeConfig({ root: JOBS_PATH });
    });

    test('should be defined', ({ app }) => {
      expect(app.stopBree).toBeDefined();
    });

    test('should stop bree', async ({ app }) => {
      app.startBree();

      expect(app.bree).toBeDefined();

      await app.stopBree();

      expect(app.bree).not.toBeDefined();
      expect(Bree.mock.results[0].value.stop).toHaveBeenCalledOnce();
    });

    test('should not stop bree if no bree exists', async ({ app }) => {
      expect(app.bree).not.toBeDefined();

      await app.stopBree();

      expect(app.bree).not.toBeDefined();
      expect(Bree.mock.results.length).toBe(0);
    });
  });
});
