//
// tests for readline stdin functions
//
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

import { App } from '../../../src-node/app';

const JOBS_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../jobs'
);

describe('readline functions', () => {
  beforeEach((ctx) => {
    ctx.app = new App();
    ctx.app.setBreeConfig({ root: JOBS_PATH });
    ctx.app.start();

    ctx.writeSpy = vi.spyOn(ctx.app, '_write');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getConfig', () => {
    test('should be defined', ({ app }) => {
      expect(app.getConfig).toBeDefined();
    });

    test('should send config', ({ app, writeSpy }) => {
      app.getConfig();

      expect(writeSpy).toHaveBeenCalledOnce();
      expect(writeSpy.calls[0][0]).toEqual({
        event: 'config',
        data: app.breeConfig
      });
    });
  });
});

// mock bree
// implementation can be found at '<root>/__mocks__/bree.js'
vi.mock('bree');
