import { expect, test } from '@playwright/test';

test('should render the correct header', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('h1')).toContainText(
    'Answer 93% of customer support tickets autonomously'
  );
});
