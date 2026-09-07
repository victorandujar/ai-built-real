import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = [
  '/',
  '/reality-check',
  '/about',
  '/check',
  '/learn',
  '/learn/is-your-ai-built-app-ready-for-production',
  '/learn/ai-built-product-launch-checklist',
  '/learn/when-your-prototype-gets-real-users',
  '/privacy',
  '/terms',
];
test('pages have valid metadata, structure and no broken internal links', async ({
  page,
  request,
}) => {
  const links = new Set<string>();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const route of routes) {
    const r = await page.goto(route);
    expect(r?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.title()).not.toBe('');
    expect(
      await page.locator('meta[name="description"]').getAttribute('content'),
    ).toBeTruthy();
    expect(
      await page.locator('link[rel="canonical"]').getAttribute('href'),
    ).toBe(`https://example.com${route}`);
    const data = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(JSON.parse(data || '{}')['@graph'].length).toBeGreaterThan(1);
    for (const a of await page
      .locator('a[href^="/"]')
      .evaluateAll((els) => els.map((e) => e.getAttribute('href')!)))
      links.add(a);
  }
  for (const link of links) {
    const r = await request.get(link);
    expect(r.status(), link).toBeLessThan(400);
  }
  expect(errors).toEqual([]);
  expect((await request.get('/missing-reality-page')).status()).toBe(404);
});
for (const width of [375, 768, 1440, 1920])
  test(`layout and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/', '/check', '/reality-check', '/learn']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        route,
      ).toBeTruthy();
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        route,
      ).toEqual([]);
      if (route === '/')
        await page.screenshot({
          path: `work/qa/home-${width}.png`,
          fullPage: true,
        });
      if (width === 375 && route === '/check')
        await page.screenshot({
          path: 'work/qa/check-375.png',
          fullPage: true,
        });
    }
  });
async function fill(page: Page) {
  await page.goto('/check');
  await page
    .getByLabel('Product URL', { exact: true })
    .fill('https://example.org');
  await page
    .getByLabel('What does your product do?')
    .fill('A scheduling product for independent makers.');
  await page.getByLabel('What did you build it with?').selectOption('Lovable');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page
    .getByLabel('Do you already have users?')
    .selectOption('Beta users');
  await page.getByLabel('Taking payments?').selectOption('Soon');
  await page
    .getByLabel('Handles customer or personal data?')
    .selectOption('Yes');
  await page.getByLabel('What are you planning next?').selectOption('Launch');
  await page
    .getByLabel('What are you most unsure about?')
    .fill('Account boundaries and checkout recovery.');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Your name', { exact: true }).fill('Test Builder');
  await page.getByLabel('Email', { exact: true }).fill('builder@example.org');
  await page.getByRole('checkbox').check();
}
test('form validation, backwards navigation and unavailable delivery retain data', async ({
  page,
}) => {
  await page.goto('/check');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('[data-step="0"]')).toBeVisible();
  await fill(page);
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByLabel('What are you most unsure about?')).toHaveValue(
    'Account boundaries and checkout recovery.',
  );
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Check my product' }).click();
  await expect(page.locator('#form-error')).toContainText(
    /not open|could not confirm/,
  );
  await expect(page.getByLabel('Email', { exact: true })).toHaveValue(
    'builder@example.org',
  );
  await expect(page.locator('#form-success')).toBeHidden();
});
test('success UI only follows confirmed server response (mock transport)', async ({
  page,
}) => {
  await page.route('**/api/leads', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Request received' }),
    }),
  );
  await fill(page);
  await page.getByRole('button', { name: 'Check my product' }).click();
  await expect(page.locator('#form-success')).toBeVisible();
  await expect(page.locator('#check-form')).toBeHidden();
});
test('API rejects cross-origin, malformed, oversized and honeypot input', async ({
  request,
}) => {
  const url = '/api/leads';
  expect((await request.post(url, { data: {} })).status()).toBe(403);
  const headers = {
    origin: process.env.TEST_BASE_URL || 'http://127.0.0.1:4330',
    'content-type': 'application/json',
  };
  expect(
    (
      await request.post(url, { headers, data: Buffer.from('invalid-json') })
    ).status(),
  ).toBe(400);
  expect(
    (await request.post(url, { headers, data: { website: 'bot' } })).status(),
  ).toBe(422);
  expect(
    (await request.post(url, { headers, data: 'x'.repeat(21000) })).status(),
  ).toBe(413);
});
test('mobile menu and keyboard skip navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.getByRole('button', { name: 'Menu' }).click();
  await expect(page.locator('#navigation')).toBeVisible();
  await page
    .getByRole('link', { name: 'Reality Check', exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/reality-check/);
});
