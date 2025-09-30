import path from 'node:path';
import { parseArgs } from 'node:util';
import SwaggerParser from '@apidevtools/swagger-parser';

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      input: {
        type: 'string',
        short: 'i'
      }
    }
  });

  const inputPath = path.resolve(values.input ?? 'docs/openapi/proxmox-ve.json');

  await SwaggerParser.validate(inputPath);

  console.log(`Validated ${inputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
