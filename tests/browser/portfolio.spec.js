const { test, expect } = require('@playwright/test');

const primaryPages = [
  'index.html',
  'case-studies/ajmera/index.html',
  'case-studies/ajmera/01-regional-content-system.html',
  'case-studies/ajmera/02-facebook-gujarati-groups.html',
  'case-studies/ajmera/03-founder-and-trust-content.html',
  'case-studies/ajmera/04-reading-the-tracker.html',
  'case-studies/ajmera/05-corporate-content.html',
  'case-studies/ajmera/06-ceo-personal-brand.html',
  'case-studies/cinekorn/index.html',
  'case-studies/cinekorn/01-data-tooling.html',
  'case-studies/cinekorn/02-telugu-kannada.html',
  'case-studies/cinekorn/03-movies-catalog.html',
  'case-studies/cinekorn/04-gujarati-system.html',
  'case-studies/cinekorn/05-kalapi-linkedin.html',
  'case-studies/cinekorn/06-company-linkedin.html',
  'case-studies/jalan/index.html',
  'case-studies/jalan/01-channel-network.html',
  'case-studies/jalan/02-influencer-marketing.html',
  'case-studies/jalan/03-tele-calling-team.html',
  'case-studies/jalan/04-festival-calendar.html',
  'case-studies/swad/index.html',
  'case-studies/swad/01-diploma-and-student-livestreams.html',
  'case-studies/swad/02-content-matching-and-series.html',
  'case-studies/swad/03-farewell-diwali-livestream.html',
  'case-studies/swad/04-sneha-channel-growth.html',
  'case-studies/swad/05-short-form-and-recovery.html',
  'case-studies/swad/06-workshops-and-revenue-insight.html'
];

for (const route of primaryPages) {
  test(`loads ${route} with core document structure`, async ({ page, baseURL }) => {
    const pageErrors = [];
    const localHttpErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    page.on('response', response => {
      if (
        response.url().startsWith(baseURL) &&
        response.status() >= 400 &&
        !new URL(response.url()).pathname.endsWith('/favicon.ico')
      ) {
        localHttpErrors.push(`${response.status()} ${response.url()}`);
      }
    });

    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response, 'navigation should return a response').not.toBeNull();
    expect(response.status(), 'page should return HTTP 200').toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.skip-link').first()).toHaveCount(1);

    const missingAlt = await page.locator('img').evaluateAll(images =>
      images.filter(image => !image.hasAttribute('alt')).map(image => image.outerHTML)
    );
    expect(missingAlt, 'all images should declare alt text (empty alt is valid for decorative images)').toEqual([]);

    await page.waitForLoadState('domcontentloaded');
    expect(pageErrors, 'no uncaught JavaScript exceptions').toEqual([]);
    expect(localHttpErrors, 'local page assets should not return HTTP errors').toEqual([]);
  });
}

test('mobile layouts do not create document-level horizontal overflow on key entry pages', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile viewport check');
  for (const route of [
    'index.html',
    'case-studies/ajmera/index.html',
    'case-studies/cinekorn/index.html',
    'case-studies/jalan/index.html',
    'case-studies/swad/index.html'
  ]) {
    await page.goto(route);
    const sizes = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth
    }));
    expect(sizes.document, `horizontal overflow on ${route}: ${JSON.stringify(sizes)}`).toBeLessThanOrEqual(sizes.viewport + 1);
  }
});

test('mobile navigation opens, closes with Escape and restores focus', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile navigation check');
  for (const route of [
    'index.html',
    'case-studies/ajmera/index.html',
    'case-studies/cinekorn/index.html',
    'case-studies/jalan/index.html',
    'case-studies/swad/index.html'
  ]) {
    await page.goto(route);
    const toggle = page.locator('#navToggle');
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  }
});
