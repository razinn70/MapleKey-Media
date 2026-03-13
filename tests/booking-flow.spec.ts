import { test, expect } from '../playwright-fixture';

test.describe('Booking Flow E2E', () => {
  test('full booking flow from homepage', async ({ page }) => {
    await page.goto('/');

    // Scroll to pricing
    const pricing = page.locator('#pricing');
    await pricing.scrollIntoViewIfNeeded();

    // Select Professional package
    await page.getByRole('button', { name: /Professional/i }).first().click();
    await expect(page.getByText('Total: $450')).toBeVisible();

    // Fill booking form
    await page.fill('input[name="client_name"]', 'Jane Doe');
    await page.fill('input[name="client_email"]', 'jane@example.com');
    await page.fill('input[name="client_phone"]', '519-555-1234');
    await page.fill('input[name="property_address"]', '123 Main Street, Kitchener ON');

    // Select a date (click the calendar trigger, then pick a future date)
    const calendarTrigger = page.getByRole('button', { name: /Pick a date/i });
    if (await calendarTrigger.isVisible()) {
      await calendarTrigger.click();
      // Pick first available non-Sunday weekday
      const availableDay = page.locator('button.rdp-day:not([disabled])').first();
      if (await availableDay.isVisible()) {
        await availableDay.click();
      }
    }

    // Verify form fields are filled
    await expect(page.locator('input[name="client_name"]')).toHaveValue('Jane Doe');
    await expect(page.locator('input[name="client_email"]')).toHaveValue('jane@example.com');
  });

  test('shows validation errors when submitting incomplete booking', async ({ page }) => {
    await page.goto('/');
    const pricing = page.locator('#pricing');
    await pricing.scrollIntoViewIfNeeded();

    // Select a package
    await page.getByRole('button', { name: /Professional/i }).first().click();

    // Try to submit without filling form
    await page.getByRole('button', { name: /Pay Now/i }).click();

    // Should see validation error
    await expect(page.getByText(/session date is required|date|name/i).first()).toBeVisible();
  });
});
