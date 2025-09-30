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
    port: 5173,
    open: true
  },
  preview: {
    port: 4173
  }
});
