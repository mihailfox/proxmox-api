import path from 'node:path';

export interface ArtifactBaseline {
  id: 'raw-snapshot' | 'normalized-ir' | 'openapi-json' | 'openapi-yaml';
  label: string;
  description: string;
  path: string;
  sha256: string;
}

const root = path.resolve('.');

function resolvePath(relativePath: string): string {
  return path.join(root, relativePath);
}

export const ARTIFACT_BASELINES: ArtifactBaseline[] = [
  {
    id: 'raw-snapshot',
    label: 'Raw API snapshot',
    description: 'Cached payload scraped from the Proxmox API viewer.',
    path: resolvePath('tools/api-scraper/data/raw/proxmox-api-schema.json'),
    sha256: '45f9efbc5a44397b2f757ce5f84a133b52c566d7502d3769b791864fe01c55b2'
  },
  {
    id: 'normalized-ir',
    label: 'Normalized intermediate representation',
    description: 'Structured document produced by the normalization pipeline.',
    path: resolvePath('tools/api-normalizer/data/ir/proxmox-api-ir.json'),
    sha256: '0a9743bb0e84990249480658d26ee6f865386271dee07541d6c93b2009e8be4d'
  },
  {
    id: 'openapi-json',
    label: 'OpenAPI JSON document',
    description: 'Generated OpenAPI 3.1 specification (JSON).',
    path: resolvePath('docs/openapi/proxmox-ve.json'),
    sha256: 'ba575eedb1cb1ba46a8213ce0b91a19466d36819761f6a72c860889cdf502973'

  },
  {
    id: 'openapi-yaml',
    label: 'OpenAPI YAML document',
    description: 'Generated OpenAPI 3.1 specification (YAML).',
    path: resolvePath('docs/openapi/proxmox-ve.yaml'),
    sha256: '8de007b4e53222cb561c80a591ac3ba755d6f8fc840fdd1b3113ff309abdd8db'
  }
];
