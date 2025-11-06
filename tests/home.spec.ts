import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should render the hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should toggle between bites and deep dives', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Bites')).toBeVisible();
    await page.getByText('Deep').click();
    await expect(page.getByText('Deep')).toHaveClass(/selected/);
  });

  test('should navigate to newsletter form', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('form');
    await expect(form).toBeVisible();
    const emailInput = form.getByLabel('Email');
    await expect(emailInput).toBeVisible();
  });

  test('should submit newsletter form', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('form');
    await form.getByLabel('Email').fill('test@example.com');
    await form.getByRole('button', { name: /subscribe/i }).click();
    await expect(page.getByText(/thanks for subscribing/i)).toBeVisible();
  });
});

test.describe('Work Pages', () => {
  test('should load dynamic work pages', async ({ page }) => {
    await page.goto('/work/first-post');
    await expect(page.getByRole('article')).toBeVisible();
  });

  test('should handle 404 pages', async ({ page }) => {
    await page.goto('/work/non-existent');
    await expect(page.getByText('404')).toBeVisible();
  });
});
