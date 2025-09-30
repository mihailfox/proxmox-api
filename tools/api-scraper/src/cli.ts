#!/usr/bin/env ts-node
import path from 'node:path';

import { DEFAULT_BASE_URL, scrapeApiDocumentation } from './scraper';

async function runScraper(): Promise<void> {
  const outputDir = path.resolve(__dirname, '..', 'data', 'raw');
  const { snapshot, filePath } = await scrapeApiDocumentation({
    persist: {
      outputDir
    }
  });

  const summary = [
    `Scraped ${snapshot.stats.rootGroupCount} top-level groups`,
    `${snapshot.stats.endpointCount} documented endpoints`,
    `source: ${DEFAULT_BASE_URL}`
  ].join(' | ');

  if (filePath) {
    console.log(`${summary} -> ${filePath}`);
  } else {
    console.log(summary);
  }
}

if (require.main === module) {
  runScraper().catch((error) => {
    console.error('Scraper execution failed:', error);
    process.exitCode = 1;
  });
}

export { runScraper };
