import { afterEach, describe, expect, it } from 'vitest';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { rename, unlink, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { loader } from '../openapi[.]json';

const SPEC_PATH = resolve('docs/openapi/proxmox-ve.json');
const SPEC_BACKUP_PATH = `${SPEC_PATH}.bak`;

function createArgs(method: string) {
  const request = new Request('http://localhost/openapi.json', { method });
  return { request, params: {}, context: {} } as unknown as LoaderFunctionArgs;
}

async function withSpecRemoved<T>(operation: () => Promise<T>) {
  await unlink(SPEC_BACKUP_PATH).catch(() => {});
  await rename(SPEC_PATH, SPEC_BACKUP_PATH);

  try {
    return await operation();
  } finally {
    await rename(SPEC_BACKUP_PATH, SPEC_PATH);
  }
}

async function withSpecReplaced<T>(contents: string, operation: () => Promise<T>) {
  await unlink(SPEC_BACKUP_PATH).catch(() => {});
  await rename(SPEC_PATH, SPEC_BACKUP_PATH);

  try {
    await writeFile(SPEC_PATH, contents, 'utf-8');
    return await operation();
  } finally {
    await unlink(SPEC_PATH).catch(() => {});
    await rename(SPEC_BACKUP_PATH, SPEC_PATH);
  }
}

afterEach(async () => {
  await unlink(SPEC_BACKUP_PATH).catch(() => {});
});

describe('openapi.json loader', () => {
  it('serves the generated OpenAPI document', async () => {
    const response = await loader(createArgs('GET'));

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toContain('application/json');

    const body = await response.text();
    const parsed = JSON.parse(body) as { openapi?: unknown; paths?: unknown };

    expect(typeof parsed.openapi).toBe('string');
    expect((parsed.openapi as string).length).toBeGreaterThan(0);
    expect(parsed.paths && typeof parsed.paths).toBe('object');
  });

  it('rejects non-GET methods', async () => {
    const response = await loader(createArgs('POST'));

    expect(response.status).toBe(405);
    const payload = await response.json();
    expect(payload).toEqual({ error: 'Method Not Allowed' });
  });

  it('returns a 404 when the spec file is missing', async () => {
    await expect(
      withSpecRemoved(async () => loader(createArgs('GET')))
    ).rejects.toMatchObject({ status: 404 });
  });

  it('throws a 500 response when the spec is invalid', async () => {
    await expect(
      withSpecReplaced('{}', async () => loader(createArgs('GET')))
    ).rejects.toMatchObject({ status: 500 });
  });
});
