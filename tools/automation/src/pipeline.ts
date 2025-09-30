import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { parseArgs } from 'node:util';

import SwaggerParser from '@apidevtools/swagger-parser';
import { stringify as stringifyYaml } from 'yaml';

import {
  DEFAULT_BASE_URL,
  scrapeApiDocumentation
} from '../../api-scraper/src/scraper';
import type { RawApiSnapshot } from '../../api-scraper/src/types';
import { normalizeSnapshot } from '../../api-normalizer/src/normalizer';
import type { NormalizedApiDocument } from '../../api-normalizer/src/types';
import { generateOpenApiDocument } from '../../openapi-generator/src/generator';
import { logRegressionReport } from './regression/report';

interface PipelineOptions {
  mode: 'ci' | 'full';
  baseUrl: string;
  rawSnapshotPath: string;
  irOutputPath: string;
  openApiOutputDir: string;
  openApiBasename: string;
  offline: boolean;
  fallbackToCache: boolean;
}

interface ScrapeOutcome {
  snapshot: RawApiSnapshot;
  sourcePath?: string;
  fromCache: boolean;
}

async function main(): Promise<void> {
  const options = resolveOptions();

  logHeading('Starting automation pipeline');

  const scrapeOutcome = await obtainRawSnapshot(options);
  if (scrapeOutcome.sourcePath) {
    log(`Raw snapshot source: ${relative(scrapeOutcome.sourcePath)}`);
  }
  log(`Snapshot ready (${scrapeOutcome.fromCache ? 'cache' : 'fresh scrape'})`);

  const normalized = await buildNormalizedDocument(
    scrapeOutcome.snapshot,
    options.irOutputPath,
    scrapeOutcome.fromCache
  );
  log(`Normalized IR written to ${relative(options.irOutputPath)}`);

  const documentPaths = await writeOpenApiDocuments(normalized, options);
  log(`OpenAPI artifacts updated:\n- ${relative(documentPaths.json)}\n- ${relative(documentPaths.yaml)}`);

  await SwaggerParser.validate(documentPaths.json);
  log(`Validated OpenAPI document ${relative(documentPaths.json)}`);

  logRegressionReport();

  logHeading('Pipeline complete');
}

function resolveOptions(): PipelineOptions {
  const { values } = parseArgs({
    options: {
      mode: { type: 'string', short: 'm' },
      offline: { type: 'boolean' },
      'fallback-to-cache': { type: 'boolean' },
      'base-url': { type: 'string' },
      'raw-output': { type: 'string' },
      'ir-output': { type: 'string' },
      'openapi-dir': { type: 'string' },
      basename: { type: 'string', short: 'b' }
    }
  });

  const mode = values.mode === 'full' ? 'full' : 'ci';
  const offlineFlag = values.offline === true;
  const fallbackFlag = values['fallback-to-cache'] === true;

  const rawSnapshotPath = path.resolve(
    values['raw-output'] ?? 'tools/api-scraper/data/raw/proxmox-api-schema.json'
  );
  const irOutputPath = path.resolve(
    values['ir-output'] ?? 'tools/api-normalizer/data/ir/proxmox-api-ir.json'
  );
  const openApiOutputDir = path.resolve(values['openapi-dir'] ?? 'docs/openapi');
  const openApiBasename = values.basename ?? 'proxmox-ve';

  return {
    mode,
    offline: mode === 'ci' ? true : offlineFlag,
    fallbackToCache: mode === 'ci' ? true : fallbackFlag,
    baseUrl: values['base-url'] ?? process.env.SCRAPER_BASE_URL ?? DEFAULT_BASE_URL,
    rawSnapshotPath,
    irOutputPath,
    openApiOutputDir,
    openApiBasename
  };
}

async function obtainRawSnapshot(options: PipelineOptions): Promise<ScrapeOutcome> {
  const { rawSnapshotPath, baseUrl, offline, fallbackToCache } = options;

  if (offline) {
    const snapshot = await readSnapshot(rawSnapshotPath);
    return { snapshot, sourcePath: rawSnapshotPath, fromCache: true };
  }

  await fs.mkdir(path.dirname(rawSnapshotPath), { recursive: true });

  try {
    log(`Scraping API viewer at ${baseUrl}`);
    const result = await scrapeApiDocumentation({
      baseUrl,
      persist: {
        outputDir: path.dirname(rawSnapshotPath),
        fileName: path.basename(rawSnapshotPath)
      }
    });
    return {
      snapshot: result.snapshot,
      sourcePath: result.filePath,
      fromCache: false
    };
  } catch (error) {
    if (!fallbackToCache) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Scrape failed (${message}). Falling back to cached snapshot.`);

    const snapshot = await readSnapshot(rawSnapshotPath);
    return { snapshot, sourcePath: rawSnapshotPath, fromCache: true };
  }
}

async function readSnapshot(filePath: string): Promise<RawApiSnapshot> {
  try {
    const payload = await fs.readFile(filePath, 'utf8');
    return JSON.parse(payload) as RawApiSnapshot;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Unable to read cached snapshot at ${relative(filePath)}: ${message}`);
  }
}

async function buildNormalizedDocument(
  snapshot: RawApiSnapshot,
  outputPath: string,
  reuseExistingMetadata: boolean
): Promise<NormalizedApiDocument> {
  const previous = reuseExistingMetadata
    ? await readNormalizedDocument(outputPath)
    : undefined;
  const normalized = normalizeSnapshot(snapshot, {
    normalizedAt: previous?.normalizedAt,
    checksum: previous?.source.snapshotChecksum
  });
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8');
  return normalized;
}

async function readNormalizedDocument(
  filePath: string
): Promise<NormalizedApiDocument | undefined> {
  try {
    const payload = await fs.readFile(filePath, 'utf8');
    return JSON.parse(payload) as NormalizedApiDocument;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return undefined;
    }
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Unable to read normalized document at ${relative(filePath)}: ${message}`);
  }
}

async function writeOpenApiDocuments(
  normalized: NormalizedApiDocument,
  options: PipelineOptions
): Promise<{ json: string; yaml: string }> {
  const document = generateOpenApiDocument(normalized);
  const jsonPath = path.join(options.openApiOutputDir, `${options.openApiBasename}.json`);
  const yamlPath = path.join(options.openApiOutputDir, `${options.openApiBasename}.yaml`);

  await fs.mkdir(options.openApiOutputDir, { recursive: true });
  await fs.writeFile(jsonPath, `${JSON.stringify(document, null, 2)}\n`, 'utf8');
  await fs.writeFile(yamlPath, `${stringifyYaml(document)}\n`, 'utf8');

  return { json: jsonPath, yaml: yamlPath };
}

function log(message: string): void {
  process.stdout.write(`${message}\n`);
}

function logHeading(message: string): void {
  process.stdout.write(`\n=== ${message} ===\n`);
}

function relative(filePath: string): string {
  return path.relative(process.cwd(), filePath) || '.';
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
