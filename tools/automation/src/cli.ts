import process from 'node:process';
import { parseArgs } from 'node:util';

import {
  runAutomationPipeline,
  type AutomationPipelineRunOptions
} from './pipeline';

function parseCliOptions(): AutomationPipelineRunOptions {
  const { values } = parseArgs({
    options: {
      mode: { type: 'string', short: 'm' },
      offline: { type: 'boolean' },
      'fallback-to-cache': { type: 'boolean' },
      'base-url': { type: 'string' },
      'raw-output': { type: 'string' },
      'ir-output': { type: 'string' },
      'openapi-dir': { type: 'string' },
      basename: { type: 'string', short: 'b' },
      report: { type: 'string' }
    },
    allowPositionals: false
  });

  return {
    mode: values.mode === 'full' ? 'full' : 'ci',
    offline: values.offline === true,
    fallbackToCache: values['fallback-to-cache'] === true,
    baseUrl: values['base-url'],
    rawSnapshotPath: values['raw-output'],
    irOutputPath: values['ir-output'],
    openApiOutputDir: values['openapi-dir'],
    openApiBasename: values.basename,
    summaryOutputPath: values.report
  } satisfies AutomationPipelineRunOptions;
}

async function main(): Promise<void> {
  const options = parseCliOptions();
  await runAutomationPipeline(options);
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
