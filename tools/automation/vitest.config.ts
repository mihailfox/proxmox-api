import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const resolveWorkspace = (...segments: string[]): string =>
  path.resolve(workspaceRoot, ...segments);

export default defineConfig({
  resolve: {
    alias: {
      "@proxmox-api/shared": resolveWorkspace("tools/shared"),
      "@proxmox-api/api-scraper": resolveWorkspace("tools/api-scraper/src"),
      "@proxmox-api/api-normalizer": resolveWorkspace("tools/api-normalizer/src"),
      "@proxmox-api/openapi-generator": resolveWorkspace("tools/openapi-generator/src"),
      "@proxmox-api/automation": resolveWorkspace("tools/automation/src"),
      "@proxmox-api/release-notes": resolveWorkspace("tools/release-notes/src"),
    },
  },
  test: {
    environment: "node",
    globals: true,
    include: ["tools/automation/tests/**/*.test.ts"],
    pool: "forks",
  },
});
