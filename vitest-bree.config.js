import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/bree/**/*.{js,mjs,cjs}'],
    environment: 'node'
  }
});
