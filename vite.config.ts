import { defineConfig } from 'vite';

export default defineConfig({
  root: 'ui',
  server: {
    port: 5173,
    open: true
  },
  preview: {
    port: 4173
  },
  build: {
    outDir: '../dist/ui',
    emptyOutDir: true
  }
});
