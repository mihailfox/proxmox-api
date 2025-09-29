import { test, expect } from '@playwright/test';

test.describe('Proxmox API viewer smoke test', () => {
  test('loads documentation landing page', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle(/Proxmox VE API Documentation/);
    await page.waitForSelector('.x-tree-node-text', { state: 'attached' });
    const resourceNodes = await page.locator('.x-tree-node-text').allTextContents();
    expect(resourceNodes.length).toBeGreaterThan(0);
  });
});
