import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

import { OPENAPI_JSON_PATH } from '../../tools/shared/paths.js';

const SPEC_PATH = OPENAPI_JSON_PATH;

type OpenAPISpec = {
  openapi?: unknown;
  paths?: unknown;
};

export async function loader({ request }: LoaderFunctionArgs) {
  if (request.method !== 'GET') {
    return json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const contents = await readSpec();

  let parsed: OpenAPISpec;

  try {
    parsed = JSON.parse(contents) as OpenAPISpec;
  } catch (error) {
    throw json(
      { error: 'OpenAPI spec is invalid JSON', details: error instanceof Error ? error.message : undefined },
      { status: 500 }
    );
  }

  if (typeof parsed.openapi !== 'string' || parsed.openapi.trim() === '') {
    throw json({ error: 'OpenAPI spec is missing the openapi version field' }, { status: 500 });
  }

  if (parsed.paths === undefined || typeof parsed.paths !== 'object' || parsed.paths === null) {
    throw json({ error: 'OpenAPI spec does not define any paths' }, { status: 500 });
  }

  return new Response(contents, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300'
    }
  });
}

async function readSpec(): Promise<string> {
  try {
    return await readFile(SPEC_PATH, 'utf-8');
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError?.code !== 'ENOENT') {
      throw json({ error: 'Failed to read OpenAPI spec' }, { status: 500 });
    }
  }

  const releaseUrl = process.env.OPENAPI_SPEC_RELEASE_URL;
  if (!releaseUrl) {
    throw json(
      {
        error: 'OpenAPI spec not found',
        remediation:
          'Run `npm run automation:pipeline` to generate local artifacts or set OPENAPI_SPEC_RELEASE_URL to a release asset URL.'
      },
      { status: 404 }
    );
  }

  let response: Response;

  try {
    response = await fetch(releaseUrl);
  } catch (error) {
    throw json(
      {
        error: 'Unable to download OpenAPI spec release asset',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 502 }
    );
  }

  if (!response.ok) {
    throw json(
      {
        error: 'Failed to download OpenAPI spec release asset',
        details: `${response.status} ${response.statusText}`
      },
      { status: 502 }
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const contents = buffer.toString('utf-8');

  try {
    JSON.parse(contents);
  } catch (error) {
    throw json(
      {
        error: 'Downloaded OpenAPI spec is invalid JSON',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 502 }
    );
  }

  await mkdir(dirname(SPEC_PATH), { recursive: true });
  await writeFile(SPEC_PATH, contents, 'utf-8');
  return contents;
}
