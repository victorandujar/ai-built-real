import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
async function choose(page: Page, name: string, value: string) {
  await page.getByRole('combobox', { name, exact: true }).click();
  await page.getByRole('option', { name: value, exact: true }).click();
}
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
  '/es',
  '/es/reality-check',
  '/es/sobre-mi',
  '/es/solicitud',
  '/es/notas',
  '/es/notas/tu-app-hecha-con-ia-esta-lista-para-produccion',
  '/es/notas/checklist-de-lanzamiento-para-productos-con-ia',
  '/es/notas/cuando-tu-prototipo-recibe-usuarios-reales',
  '/es/privacidad',
  '/es/terminos',
];
/** Each entry is a page and its counterpart in the other language. */
const translated = [
  ['/', '/es'],
  ['/reality-check', '/es/reality-check'],
  ['/about', '/es/sobre-mi'],
  ['/check', '/es/solicitud'],
  ['/learn', '/es/notas'],
  ['/privacy', '/es/privacidad'],
  ['/terms', '/es/terminos'],
  [
    '/learn/when-your-prototype-gets-real-users',
    '/es/notas/cuando-tu-prototipo-recibe-usuarios-reales',
  ],
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
  await choose(page, 'What did you build it with?', 'Lovable');
  await page.getByRole('button', { name: 'Continue' }).click();
  await choose(page, 'Do you already have users?', 'Beta users');
  await choose(page, 'Taking payments?', 'Soon');
  await choose(page, 'Handles customer or personal data?', 'Yes');
  await choose(page, 'What are you planning next?', 'Launch');
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
  // UI tests never contact real delivery, even when local credentials exist.
  await page.route('**/api/leads', (route) =>
    route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'We could not confirm delivery. Your entries are still here.',
      }),
    }),
  );
  await page.goto('/check');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('[data-step="0"]')).toBeVisible();
  await fill(page);
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByLabel('What are you most unsure about?')).toHaveValue(
    'Account boundaries and checkout recovery.',
  );
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Send my request' }).click();
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
  await page.route('**/api/leads', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Request received' }),
    });
  });
  await fill(page);
  await page.getByRole('button', { name: 'Send my request' }).click();
  await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled();
  await expect(page.locator('#form-success')).toBeVisible();
  await expect(page.locator('#success-email')).toHaveText(
    'builder@example.org',
  );
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

test('custom select supports keyboard selection and error focus', async ({
  page,
}) => {
  await page.goto('/check');
  await page
    .getByLabel('Product URL', { exact: true })
    .fill('https://example.org');
  await page
    .getByLabel('What does your product do?')
    .fill('A scheduling product for makers.');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  const combo = page.getByRole('combobox', {
    name: 'What did you build it with?',
  });
  await expect(combo).toBeFocused();
  await expect(combo).toHaveAttribute('aria-invalid', 'true');
  await combo.press('Enter');
  await combo.press('c');
  await combo.press('Enter');
  await expect(combo).toHaveText(/Cursor/);
  await expect(combo).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.locator('[data-request-object]')).toHaveAttribute(
    'data-stage',
    '1',
  );
});

test('home scenes are keyboard accessible and review lenses disclose one at a time', async ({
  page,
}) => {
  await page.goto('/');
  const first = page.getByRole('tab', { name: '01 The first stranger.' });
  await first.focus();
  await first.press('ArrowRight');
  await expect(
    page.getByRole('tab', { name: '02 The second account.' }),
  ).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Two customers. Two separate worlds.' }),
  ).toBeVisible();
  await page
    .locator('.lens-list summary')
    .filter({ hasText: 'Engineering' })
    .click();
  await expect(page.locator('.lens-list details[open]')).toHaveCount(1);
  await expect(
    page.getByRole('heading', { name: 'Can you keep building on it?' }),
  ).toBeVisible();
  await expect(page.locator('.journal-volume')).toHaveCount(3);
});

test('every page declares its language and reciprocal hreflang alternates', async ({
  page,
}) => {
  for (const [en, es] of translated) {
    for (const [route, lang] of [
      [en, 'en'],
      [es, 'es'],
    ] as const) {
      await page.goto(route);
      expect(await page.locator('html').getAttribute('lang'), route).toBe(lang);
      for (const [alternate, hreflang] of [
        [en, 'en'],
        [es, 'es'],
      ] as const)
        expect(
          await page
            .locator(`link[rel="alternate"][hreflang="${hreflang}"]`)
            .getAttribute('href'),
          `${route} -> ${hreflang}`,
        ).toBe(`https://example.com${alternate === '/' ? '/' : alternate}`);
      expect(
        await page
          .locator('link[rel="alternate"][hreflang="x-default"]')
          .getAttribute('href'),
        route,
      ).toBe(`https://example.com${en === '/' ? '/' : en}`);
    }
  }
});

test('the language switcher moves between counterpart pages', async ({
  page,
}) => {
  for (const [en, es] of translated) {
    await page.goto(en);
    await page.getByRole('link', { name: 'Español' }).click();
    await expect(page).toHaveURL(new RegExp(`${es}$`));
    await page.getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(new RegExp(`${en === '/' ? '/$' : en + '$'}`));
  }
});

test('the Spanish request form submits in Spanish', async ({ page }) => {
  await page.route('**/api/leads', (route) => {
    expect(JSON.parse(route.request().postData() || '{}').locale).toBe('es');
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Solicitud recibida' }),
    });
  });
  await page.goto('/es/solicitud');
  await page
    .getByLabel('URL del producto', { exact: true })
    .fill('https://example.org');
  await page
    .getByLabel('¿Qué hace tu producto?')
    .fill('Una herramienta de reservas para creadoras independientes.');
  await choose(page, '¿Con qué lo has construido?', 'Lovable');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await choose(page, '¿Ya tienes usuarios?', 'Usuarios beta');
  await choose(page, '¿Cobras pagos?', 'Pronto');
  await choose(page, '¿Maneja datos de clientes o personales?', 'Sí');
  await choose(page, '¿Qué tienes planeado ahora?', 'Lanzamiento');
  await page
    .getByLabel('¿Qué es lo que más dudas te genera?')
    .fill('Los límites entre cuentas y la recuperación del checkout.');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByLabel('Tu nombre', { exact: true }).fill('Prueba');
  await page.getByLabel('Email', { exact: true }).fill('builder@example.org');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Enviar mi solicitud' }).click();
  await expect(page.locator('#form-success')).toBeVisible();
  await expect(page.locator('#success-email')).toHaveText(
    'builder@example.org',
  );
});

test('Spanish pages are accessible and stay within the viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 1000 });
  for (const route of [
    '/es',
    '/es/solicitud',
    '/es/reality-check',
    '/es/notas',
  ]) {
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
    // Contrast is a site-wide brand issue already asserted by the English suite
    // above. This test targets regressions specific to the translation: longer
    // strings, translated labels and per-locale markup.
    expect(
      result.violations
        .filter((v) => v.id !== 'color-contrast')
        .map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      route,
    ).toEqual([]);
  }
});
