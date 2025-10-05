#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, rmSync, copyFileSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const outputDir = path.resolve(repoRoot, "var/pages");
const buildDir = path.resolve(repoRoot, "build/client");
const openApiDir = path.resolve(repoRoot, "var/openapi");

if (!existsSync(buildDir)) {
  throw new Error(
    "React Router build output not found. Run `npm run ui:build` before preparing pages."
  );
}

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

cpSync(buildDir, outputDir, { recursive: true });

copyFileSync(path.join(openApiDir, "proxmox-ve.yaml"), path.join(outputDir, "proxmox-ve.yaml"));
