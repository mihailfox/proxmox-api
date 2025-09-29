#!/usr/bin/env ts-node
import { chromium } from '@playwright/test';

export async function runScraper(): Promise<void> {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await page.goto('https://pve.proxmox.com/pve-docs/api-viewer/');
  const title = await page.title();
  console.log(`Loaded API viewer page with title: ${title}`);
  await context.close();
  await browser.close();
}

if (require.main === module) {
  runScraper().catch((error) => {
    console.error('Scraper execution failed:', error);
    process.exitCode = 1;
  });
}
