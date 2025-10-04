import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/main.ts'
  },
  format: 'esm',
  sourcemap: true,
  clean: true,
  dts: false,
  platform: 'node',
  target: 'node20',
  outDir: 'dist',
  bundle: true,
  shims: false,
  noExternal: ['@actions/core', '@actions/exec'],
  external: ['playwright', 'playwright-core', 'chromium-bidi']
});
