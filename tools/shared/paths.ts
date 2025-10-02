import path from 'node:path';

import { resolveFromModule } from './module-paths.js';

export const REPO_ROOT = resolveFromModule(import.meta, '..', '..');

export const VAR_DIR = path.join(REPO_ROOT, 'var');
export const OPENAPI_ARTIFACT_DIR = path.join(VAR_DIR, 'openapi');
export const OPENAPI_BASENAME = 'proxmox-ve';
export const OPENAPI_JSON_PATH = path.join(OPENAPI_ARTIFACT_DIR, `${OPENAPI_BASENAME}.json`);
export const OPENAPI_YAML_PATH = path.join(OPENAPI_ARTIFACT_DIR, `${OPENAPI_BASENAME}.yaml`);

export function resolveFromRoot(relativePath: string): string {
  return path.join(REPO_ROOT, relativePath);
}

export function relativeToRoot(targetPath: string): string {
  return path.relative(REPO_ROOT, targetPath);
}
