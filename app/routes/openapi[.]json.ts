import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

const SPEC_PATH = resolve('docs/openapi/proxmox-ve.json');

type OpenAPISpec = {
  openapi?: unknown;
  paths?: unknown;
};

export async function loader({ request }: LoaderFunctionArgs) {
  if (request.method !== 'GET') {
    return json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  let contents: string;

  try {
    contents = await readFile(SPEC_PATH, 'utf-8');
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError?.code === 'ENOENT') {
      throw json({ error: 'OpenAPI spec not found' }, { status: 404 });
    }

    throw json({ error: 'Failed to read OpenAPI spec' }, { status: 500 });
  }

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
