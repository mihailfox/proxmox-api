import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: path.resolve(__dirname),
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['app/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: path.resolve(__dirname, 'coverage/ui')
    }
  }
});
