#!/usr/bin/env node
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const repoRoot = process.cwd();
const sourceJson = resolve(repoRoot, "var/openapi/proxmox-ve.json");
const sourceYaml = resolve(repoRoot, "var/openapi/proxmox-ve.yaml");

const requireArtifacts = process.argv.includes("--require-artifacts");

if (!existsSync(sourceJson) || !existsSync(sourceYaml)) {
  if (requireArtifacts || process.env.UI_SYNC_REQUIRE_ARTIFACTS === "true") {
    throw new Error(
      "OpenAPI artifacts not found in var/openapi. Run `npm run automation:pipeline` (or the relevant generators) before syncing UI assets."
    );
  }

  console.warn(
    "[ui:sync-openapi] Skipping copy because var/openapi artifacts are missing. Run `npm run automation:pipeline` to generate them."
  );
  process.exit(0);
}

const destination = resolve(repoRoot, "public/openapi.json");
mkdirSync(dirname(destination), { recursive: true });
copyFileSync(sourceJson, destination);

const destinationYaml = resolve(repoRoot, "public/proxmox-ve.yaml");
copyFileSync(sourceYaml, destinationYaml);
