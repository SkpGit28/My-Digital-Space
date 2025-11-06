import { test, expect } from '@playwright/test';
import { isEmail } from '../src/lib/validators';
import { track } from '../src/lib/analytics';
import { useTheme } from '../src/lib/theme';
import { useSearch } from '../src/lib/search';
import { Bite, DeepDive } from '../src/types';

test.describe('Validators', () => {
  test('isEmail should validate email addresses', () => {
    expect(isEmail('test@example.com')).toBeTruthy();
    expect(isEmail('invalid-email')).toBeFalsy();
    expect(isEmail('')).toBeFalsy();
  });
});

test.describe('Analytics', () => {
  test('track should handle analytics events', () => {
    const eventName = 'test_event';
    const payload = { test: true };
    expect(() => track(eventName, payload)).not.toThrow();
  });
});

test.describe('Theme', () => {
  test('useTheme should provide theme context', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const theme = useTheme();
      expect(theme.theme).toBe('light');
      theme.toggleTheme();
      expect(theme.theme).toBe('dark');
    });
  });
});

test.describe('Search', () => {
  test('useSearch should filter items', async ({ page }) => {
    const items: Bite[] = [
      {
        id: '1',
        title: 'Test 1',
        summary: 'Summary 1',
        tags: ['tag1'],
        image: '/test1.jpg',
        ctaLabel: 'Read More',
        href: '/bites/test-1',
        content: 'Test content 1',
        publishedAt: '2025-01-01'
      },
      {
        id: '2',
        title: 'Test 2',
        summary: 'Summary 2',
        tags: ['tag2'],
        image: '/test2.jpg',
        ctaLabel: 'Read More',
        href: '/bites/test-2',
        content: 'Test content 2',
        publishedAt: '2025-01-02'
      }
    ];

    await page.evaluate(({ items }) => {
      const { searchQuery, setSearchQuery, filteredItems } = useSearch(items);
      expect(filteredItems.length).toBe(2);
      setSearchQuery('Test 1');
      expect(filteredItems.length).toBe(1);
      expect(filteredItems[0].title).toBe('Test 1');
    }, { items });
  });
});
