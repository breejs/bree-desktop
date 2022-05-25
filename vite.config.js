import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    }
  },
  test: {
    include: ['test/ui/**/*.{js,mjs,cjs}'],
    environment: 'happy-dom'
  }
});
