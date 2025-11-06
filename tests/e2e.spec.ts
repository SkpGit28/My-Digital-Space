import { test, expect } from '@playwright/test';

test.describe('Portfolio Website End-to-End', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('complete user journey', async ({ page }) => {
    // Test hero section visibility
    await expect(page.getByRole('banner')).toBeVisible();
    
    // Test navigation
    await expect(page.getByRole('navigation')).toBeVisible();
    
    // Test content switching
    await expect(page.getByText('Bites')).toBeVisible();
    await page.getByText('Deep').click();
    await expect(page.getByText('Deep')).toHaveClass(/selected/);
    
    // Test card interaction
    const firstCard = page.locator('.card').first();
    await expect(firstCard).toBeVisible();
    await firstCard.click();
    
    // Verify navigation to detail page
    await expect(page.url()).toContain('/work/');
    await expect(page.getByRole('article')).toBeVisible();
    
    // Test navigation back to home
    await page.goBack();
    await expect(page.url()).toBe(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/');
    
    // Test newsletter subscription
    const form = page.locator('form');
    await form.getByLabel('Email').fill('test@example.com');
    await form.getByRole('button', { name: /subscribe/i }).click();
    await expect(page.getByText(/thanks for subscribing/i)).toBeVisible();
    
    // Test footer links
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('accessibility navigation', async ({ page }) => {
    // Test skip link
    await page.keyboard.press('Tab');
    await expect(page.getByText('Skip to content')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('responsive design', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('navigation')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('navigation')).toBeVisible();
    
    // Test desktop view
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('dark mode toggle', async ({ page }) => {
    // Find and click theme toggle
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();
    await themeToggle.click();
    
    // Verify dark mode is active
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Toggle back to light mode
    await themeToggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
});
