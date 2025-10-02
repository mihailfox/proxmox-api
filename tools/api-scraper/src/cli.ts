import { isExecutedFromCli, resolveFromModule } from '../../shared/module-paths.js';
import { DEFAULT_BASE_URL, scrapeApiDocumentation } from './scraper.js';

async function runScraper(): Promise<void> {
  const outputDir = resolveFromModule(import.meta, '..', 'data', 'raw');
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

if (isExecutedFromCli(import.meta)) {
  runScraper().catch((error) => {
    console.error('Scraper execution failed:', error);
    process.exitCode = 1;
  });
}

export { runScraper };
