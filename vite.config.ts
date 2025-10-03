import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/*.test.{js,jsx,ts,tsx}']
    })
  ],
  publicDir: 'public',
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: false
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
    open: false
  }
});
