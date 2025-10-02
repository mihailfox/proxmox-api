import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { loader } from '../openapi[.]json';
import { OPENAPI_JSON_PATH } from '../../../tools/shared/paths.js';

const SPEC_PATH = OPENAPI_JSON_PATH;
const SPEC_DIR = dirname(SPEC_PATH);

function createArgs(method: string) {
  const request = new Request('http://localhost/openapi.json', { method });
  return { request, params: {}, context: {} } as unknown as LoaderFunctionArgs;
}

async function resetSpec() {
  await rm(SPEC_PATH, { force: true });
}

beforeEach(async () => {
  delete process.env.OPENAPI_SPEC_RELEASE_URL;
  vi.restoreAllMocks();
  await resetSpec();
});

afterEach(async () => {
  await resetSpec();
});

describe('openapi.json loader', () => {
  it('serves the generated OpenAPI document', async () => {
    await mkdir(SPEC_DIR, { recursive: true });
    await writeFile(
      SPEC_PATH,
      JSON.stringify(
        {
          openapi: '3.1.0',
          info: { title: 'Test', version: '1.0.0' },
          paths: {
            '/test': {
              get: {
                operationId: 'getTest'
              }
            }
          }
        },
        null,
        2
      ),
      'utf-8'
    );

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
    await expect(loader(createArgs('GET'))).rejects.toMatchObject({ status: 404 });
  });

  it('throws a 500 response when the spec is invalid', async () => {
    await mkdir(SPEC_DIR, { recursive: true });
    await writeFile(SPEC_PATH, '{}', 'utf-8');

    await expect(loader(createArgs('GET'))).rejects.toMatchObject({ status: 500 });
  });

  it('downloads the spec from a release asset when configured', async () => {
    process.env.OPENAPI_SPEC_RELEASE_URL = 'https://example.com/spec.json';
    const payload = JSON.stringify({
      openapi: '3.1.0',
      info: { title: 'Release', version: '1.0.0' },
      paths: { '/': { get: {} } }
    });

    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(payload, { status: 200, headers: { 'Content-Type': 'application/json' } }));

    const response = await loader(createArgs('GET'));

    expect(fetchMock).toHaveBeenCalledWith('https://example.com/spec.json');
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(JSON.parse(text)).toMatchObject({ info: { title: 'Release' } });
  });

  it('reports an error when the release asset is invalid JSON', async () => {
    process.env.OPENAPI_SPEC_RELEASE_URL = 'https://example.com/spec.json';

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('not json', { status: 200, headers: { 'Content-Type': 'application/json' } })
    );

    await expect(loader(createArgs('GET'))).rejects.toMatchObject({ status: 502 });
  });
});
