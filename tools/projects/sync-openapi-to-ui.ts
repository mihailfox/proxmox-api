#!/usr/bin/env node
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const repoRoot = process.cwd();
const sourceJson = resolve(repoRoot, "var/openapi/proxmox-ve.json");
const sourceYaml = resolve(repoRoot, "var/openapi/proxmox-ve.yaml");

if (!existsSync(sourceJson) || !existsSync(sourceYaml)) {
  throw new Error(
    "OpenAPI artifacts not found in var/openapi. Run `npm run automation:pipeline` (or the relevant generators) before syncing UI assets."
  );
}

const destination = resolve(repoRoot, "public/openapi.json");
mkdirSync(dirname(destination), { recursive: true });
copyFileSync(sourceJson, destination);

const destinationYaml = resolve(repoRoot, "public/proxmox-ve.yaml");
copyFileSync(sourceYaml, destinationYaml);
