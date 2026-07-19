import { test } from '@playwright/test';
import path from 'path';

test('capture page screenshots for visual verification', async ({ page }) => {
  // Give this test a 120 second timeout because it Navigates to 5 pages that need to be compiled on demand
  test.setTimeout(120000);
  
  const targetDir = 'C:\\Users\\Sushant Kumar\\.gemini\\antigravity\\brain\\58600a4f-ee5d-473f-9454-3f11560dc5e1';
  
  const urls = [
    { name: 'homepage', path: '/' },
    { name: 'about', path: '/about' },
    { name: 'work', path: '/work' },
    { name: 'case_study_one_dark', path: '/case-studies/trust-revenue' },
    { name: 'case_study_two_light', path: '/case-studies/case-study-two' }
  ];

  for (const item of urls) {
    console.log(`Navigating to ${item.name} (${item.path})...`);
    try {
      await page.goto(item.path, { waitUntil: 'load', timeout: 45000 });
      // Wait for 3 seconds for compilation/HMR/animations to settle
      await page.waitForTimeout(3000);
      
      // Remove any fixed transition overlays if they block the screen
      await page.evaluate(() => {
        const overlay = document.querySelector('.fixed.inset-0.z-9999');
        if (overlay) overlay.remove();
        document.querySelectorAll('*').forEach(el => {
          const style = getComputedStyle(el);
          if (style.opacity === '0') {
            (el as HTMLElement).style.opacity = '1';
          }
        });
      });
      
      const screenshotPath = path.join(targetDir, `verification_${item.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`Successfully saved screenshot to ${screenshotPath}`);
    } catch (e) {
      console.error(`Failed to capture ${item.name}:`, e);
    }
  }
});
