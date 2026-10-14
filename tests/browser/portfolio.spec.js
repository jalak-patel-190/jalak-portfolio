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

    const navToggle = page.locator('#navToggle');
    if (await navToggle.count()) {
      const visibleLabel = (await navToggle.innerText()).trim().toLowerCase();
      const accessibleLabel = ((await navToggle.getAttribute('aria-label')) || visibleLabel).trim().toLowerCase();
      expect(accessibleLabel, 'navigation accessible name should include its visible label').toContain(visibleLabel);
    }

    const missingAlt = await page.locator('img').evaluateAll(images =>
      images.filter(image => !image.hasAttribute('alt')).map(image => image.outerHTML)
    );
    expect(missingAlt, 'all images should declare alt text (empty alt is valid for decorative images)').toEqual([]);

    await page.waitForLoadState('domcontentloaded');
    expect(pageErrors, 'no uncaught JavaScript exceptions').toEqual([]);
    expect(localHttpErrors, 'local page assets should not return HTTP errors').toEqual([]);
  });
}

test('mobile layouts do not create document-level horizontal overflow on all primary pages', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile viewport check');
  for (const route of primaryPages) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
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


test('live GitHub Pages deployment serves all 27 primary pages', async ({ page }) => {
  test.skip(!process.env.PORTFOLIO_LIVE_URL, 'live deployment smoke test is not configured');
  const liveBaseURL = process.env.PORTFOLIO_LIVE_URL;
  const livePages = primaryPages;
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  for (const route of livePages) {
    const response = await page.goto(new URL(route, liveBaseURL).toString(), { waitUntil: 'domcontentloaded' });
    expect(response, `live page should respond: ${route}`).not.toBeNull();
    expect(response.status(), `live page should return HTTP 200: ${route}`).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.skip-link').first()).toHaveCount(1);
  }
  expect(pageErrors, 'live primary pages should not throw uncaught JavaScript errors').toEqual([]);
});


const AxeBuilder = require('@axe-core/playwright').default;
const accessibilityEntryPages = primaryPages;

for (const route of accessibilityEntryPages) {
  test(`WCAG 2.1 A/AA accessibility scan: ${route}`, async ({ page }) => {
    // Evaluate the stable end state instead of a transient mid-transition opacity.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    // Do not audit third-party YouTube player internals as if they were portfolio markup.
    await page.route(/youtube(-nocookie)?\.com/, routeRequest => routeRequest.abort());
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    const results = await new AxeBuilder({ page })
      // Third-party YouTube iframe internals are outside portfolio markup/control.
      .exclude('iframe')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const violations = results.violations.map(violation => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      nodes: violation.nodes.map(node => ({
        target: node.target,
        failureSummary: node.failureSummary
      }))
    }));
    expect(violations, 'axe-core found WCAG 2.1 A/AA violations').toEqual([]);
  });
}


test('local image and video asset URLs resolve across all 27 primary pages', async ({ page, request, baseURL }) => {
  const localAssets = new Set();
  const localOrigin = new URL(baseURL).origin;

  for (const route of primaryPages) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    const sources = await page.locator('img[src], video source[src]').evaluateAll(elements =>
      elements.map(element => element.getAttribute('src')).filter(Boolean)
    );
    for (const source of sources) {
      if (/^(?:https?:|data:|blob:|\/\/)/i.test(source)) continue;
      const url = new URL(source, page.url());
      if (url.origin === localOrigin) localAssets.add(url.toString());
    }
  }

  const failures = [];
  for (const url of localAssets) {
    const response = await request.get(url, { timeout: 10000 });
    if (response.status() !== 200) failures.push(`${response.status()} ${url}`);
  }
  expect(failures, 'all local image/video sources should return HTTP 200').toEqual([]);
});

test('live legacy routes redirect to the canonical company hubs', async ({ page }) => {
  test.skip(!process.env.PORTFOLIO_LIVE_URL, 'live deployment smoke test is not configured');
  const liveBaseURL = process.env.PORTFOLIO_LIVE_URL;
  const routes = [
    { legacy: 'case-studies/ajmera.html', canonical: 'case-studies/ajmera/' },
    { legacy: 'case-studies/cinekorn.html', canonical: 'case-studies/cinekorn/' },
    { legacy: 'case-studies/jalan-megamart.html', canonical: 'case-studies/jalan/' },
    { legacy: 'case-studies/swad.html', canonical: 'case-studies/swad/' }
  ];

  for (const route of routes) {
    await page.goto(new URL(route.legacy, liveBaseURL).toString(), { waitUntil: 'domcontentloaded' });
    const expectedPath = new URL(route.canonical, liveBaseURL).pathname;
    await expect.poll(() => new URL(page.url()).pathname).toBe(expectedPath);
    await expect(page.locator('h1')).toHaveCount(1);
  }
});

test('live custom 404 page returns 404 and offers a route back to the portfolio', async ({ page }) => {
  test.skip(!process.env.PORTFOLIO_LIVE_URL, 'live deployment smoke test is not configured');
  const missingURL = new URL('__portfolio-audit-not-found-check__', process.env.PORTFOLIO_LIVE_URL).toString();
  const response = await page.goto(missingURL, { waitUntil: 'domcontentloaded' });
  expect(response).not.toBeNull();
  expect(response.status()).toBe(404);
  await expect(page).toHaveTitle(/Page Not Found/i);
  await expect(page.locator('h1')).toContainText("THIS PAGE ISN'T HERE.");
  await expect(page.locator('.skip-link')).toHaveCount(1);
});


test('audit documents and QA source files are not published after Pages deployment', async ({ request }) => {
  test.skip(process.env.CHECK_PUBLISHED_INTERNAL_PATHS !== 'true', 'runs after a successful GitHub Pages deployment');
  const liveBaseURL = process.env.PORTFOLIO_LIVE_URL;
  const unpublishedPaths = [
    'audit/PORTFOLIO_AUDIT_REPORT.md',
    'audit/PORTFOLIO_AUDIT_REPORT.html',
    'docs/PORTFOLIO_AUDIT_LOG.md',
    'docs/PORTFOLIO_AUDIT_LOG.html',
    'PORTFOLIO_AUDIT_CHANGELOG_2026-10-12.md',
    'PORTFOLIO_AUDIT_IMPLEMENTATION_LOG.md',
    'package.json',
    'playwright.config.js',
    'tests/browser/portfolio.spec.js'
  ];

  for (const path of unpublishedPaths) {
    const response = await request.get(new URL(path, liveBaseURL).toString());
    expect(response.status(), `${path} should not be published`).toBe(404);
  }
});


test('external YouTube thumbnail URLs referenced by primary pages respond with images', async ({ request }) => {
  test.skip(process.env.CHECK_EXTERNAL_MEDIA !== 'true', 'runs against published pages after a successful main-branch deployment');
  const liveBaseURL = process.env.PORTFOLIO_LIVE_URL;
  const thumbnailURLs = new Set();

  // Read the deployed page markup so this checks the published HTML, not only the local checkout.
  for (const route of primaryPages) {
    const response = await request.get(new URL(route, liveBaseURL).toString(), { timeout: 15000 });
    expect(response.status(), `live page should respond while collecting thumbnails: ${route}`).toBe(200);
    const html = await response.text();
    for (const match of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)) {
      const src = match[1];
      if (/^https?:\/\/(?:img\.youtube\.com|i\.ytimg\.com)\//i.test(src)) {
        thumbnailURLs.add(src);
      }
    }
  }

  expect(thumbnailURLs.size, 'the published primary pages should contain YouTube thumbnail URLs').toBeGreaterThan(0);

  const confirmedFailures = [];
  const inconclusive = [];
  const urls = [...thumbnailURLs];

  // Limit concurrency to reduce the chance of triggering third-party rate limits.
  for (let offset = 0; offset < urls.length; offset += 5) {
    const batch = await Promise.all(urls.slice(offset, offset + 5).map(async url => {
      let lastStatus = 0;
      let lastContentType = '';
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await request.get(url, { timeout: 15000 });
          lastStatus = response.status();
          lastContentType = response.headers()['content-type'] || '';
          if (lastStatus === 200 && /^image\//i.test(lastContentType)) {
            return { url, result: 'ok' };
          }
          if (lastStatus === 403 || lastStatus === 429 || lastStatus >= 500) continue;
          return { url, result: 'failure', status: lastStatus, contentType: lastContentType };
        } catch (error) {
          if (attempt === 1) return { url, result: 'inconclusive', error: String(error) };
        }
      }
      return { url, result: 'inconclusive', status: lastStatus, contentType: lastContentType };
    }));

    for (const result of batch) {
      if (result.result === 'failure') confirmedFailures.push(result);
      if (result.result === 'inconclusive') inconclusive.push(result);
    }
  }

  if (inconclusive.length) {
    console.warn('External thumbnail checks inconclusive due to access/rate-limit/network responses:', JSON.stringify(inconclusive));
  }
  expect(confirmedFailures, 'confirmed missing or non-image YouTube thumbnails').toEqual([]);
});
