import { promises as fs } from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { stringify as stringifyYaml } from 'yaml';

import { generateOpenApiDocument } from './generator';
import type { NormalizedApiDocument } from '../../api-normalizer/src/types';

type SupportedFormat = 'json' | 'yaml';

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      input: {
        type: 'string',
        short: 'i'
      },
      output: {
        type: 'string',
        short: 'o'
      },
      basename: {
        type: 'string',
        short: 'b'
      },
      format: {
        type: 'string',
        short: 'f'
      }
    }
  });

  const inputPath = path.resolve(values.input ?? 'tools/api-normalizer/data/ir/proxmox-api-ir.json');
  const outputDir = path.resolve(values.output ?? 'docs/openapi');
  const basename = values.basename ?? 'proxmox-ve';
  const formats = parseFormatList(values.format);

  const rawContent = await fs.readFile(inputPath, 'utf8');
  const ir = JSON.parse(rawContent) as NormalizedApiDocument;

  const document = generateOpenApiDocument(ir);

  await fs.mkdir(outputDir, { recursive: true });

  const writtenFiles: string[] = [];

  if (formats.has('json')) {
    const jsonPath = path.join(outputDir, `${basename}.json`);
    const payload = `${JSON.stringify(document, null, 2)}\n`;
    await fs.writeFile(jsonPath, payload, 'utf8');
    writtenFiles.push(jsonPath);
  }

  if (formats.has('yaml')) {
    const yamlPath = path.join(outputDir, `${basename}.yaml`);
    const payload = `${stringifyYaml(document)}\n`;
    await fs.writeFile(yamlPath, payload, 'utf8');
    writtenFiles.push(yamlPath);
  }

  if (writtenFiles.length === 0) {
    throw new Error('No output formats selected. Use --format to specify json and/or yaml.');
  }

  for (const filePath of writtenFiles) {
    console.log(`Generated ${filePath}`);
  }
}

function parseFormatList(value: unknown): Set<SupportedFormat> {
  if (!value) {
    return new Set<SupportedFormat>(['json', 'yaml']);
  }

  const formats = new Set<SupportedFormat>();
  const tokens = String(value)
    .split(',')
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);

  for (const token of tokens) {
    if (token === 'json' || token === 'yaml') {
      formats.add(token);
    }
  }

  return formats;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
