import { test, expect } from '../playwright-fixture';

test.describe('Homepage', () => {
  test('renders hero section with correct heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Turn Attention Into Appointments');
  });

  test('renders all main navigation links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav').first();
    await expect(nav.getByText('Services')).toBeVisible();
    await expect(nav.getByText('Pricing')).toBeVisible();
    await expect(nav.getByText('Portfolio')).toBeVisible();
    await expect(nav.getByText('About')).toBeVisible();
    await expect(nav.getByText('Contact')).toBeVisible();
  });

  test('renders services section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.getByText('Complete Media Solutions')).toBeVisible();
  });

  test('renders testimonials section', async ({ page }) => {
    await page.goto('/');
    const testimonials = page.locator('#testimonials');
    await testimonials.scrollIntoViewIfNeeded();
    await expect(testimonials).toBeVisible();
    await expect(page.getByText('What Our Clients Say')).toBeVisible();
  });

  test('renders pricing section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#pricing')).toBeVisible();
  });

  test('renders contact section', async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toBeVisible();
  });

  test('dark mode toggle works', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);

    // Click moon icon to enable dark mode
    await page.getByLabel(/Switch to dark mode/i).click();
    await expect(html).toHaveClass(/dark/);

    // Click sun icon to disable dark mode
    await page.getByLabel(/Switch to light mode/i).click();
    await expect(html).not.toHaveClass(/dark/);
  });
});
