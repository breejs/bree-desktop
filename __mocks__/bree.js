import { vi } from 'vitest';

const Bree = vi.fn(() => ({
  start: vi.fn(),
  stop: vi.fn(),
  on: vi.fn(),
  removeAllListeners: vi.fn()
}));

export default Bree;
