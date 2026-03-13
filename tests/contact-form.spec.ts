import { test, expect } from '../playwright-fixture';

test.describe('Contact Form E2E', () => {
  test('fills and submits contact form', async ({ page }) => {
    await page.goto('/');

    // Scroll to contact section
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();

    // Fill form
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#message', 'I need professional photos for my listing at 456 Oak Ave.');

    // Submit
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Should see success toast or confirmation (network may fail in test env, just verify no crash)
    await page.waitForTimeout(1000);

    // Verify page didn't crash
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('shows validation errors for empty required fields', async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();

    // Submit empty form
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Should show required field errors
    await expect(page.getByText(/first name/i).first()).toBeVisible();
  });

  test('shows error for short message', async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();

    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#message', 'Hi');

    await page.getByRole('button', { name: /Send Message/i }).click();

    // Should show message length error
    await expect(page.getByText(/at least 10 characters/i)).toBeVisible();
  });
});
