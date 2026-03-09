import { describe, it, expect } from 'vitest';
import { bookingSchema, contactSchema } from '@/lib/validations';

describe('bookingSchema', () => {
  const validBooking = {
    client_name: 'Jane Smith',
    client_email: 'jane@example.com',
    property_address: '123 Main St, Kitchener',
    session_date: new Date(Date.now() + 86400000 * 3), // 3 days from now, adjust if Sunday
  };

  // Ensure valid date is not a Sunday
  const getValidDate = () => {
    const d = new Date(Date.now() + 86400000 * 3);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return d;
  };

  it('accepts valid data', () => {
    const result = bookingSchema.safeParse({ ...validBooking, session_date: getValidDate() });
    expect(result.success).toBe(true);
  });

  it('rejects short name', () => {
    const result = bookingSchema.safeParse({ ...validBooking, client_name: 'J', session_date: getValidDate() });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = bookingSchema.safeParse({ ...validBooking, client_email: 'not-email', session_date: getValidDate() });
    expect(result.success).toBe(false);
  });

  it('rejects short address', () => {
    const result = bookingSchema.safeParse({ ...validBooking, property_address: '123', session_date: getValidDate() });
    expect(result.success).toBe(false);
  });

  it('rejects past dates', () => {
    const pastDate = new Date('2020-01-01');
    const result = bookingSchema.safeParse({ ...validBooking, session_date: pastDate });
    expect(result.success).toBe(false);
  });

  it('rejects Sundays', () => {
    // Find next Sunday
    const d = new Date();
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7) + 7);
    const result = bookingSchema.safeParse({ ...validBooking, session_date: d });
    expect(result.success).toBe(false);
  });

  it('allows optional phone', () => {
    const result = bookingSchema.safeParse({ ...validBooking, session_date: getValidDate(), client_phone: '' });
    expect(result.success).toBe(true);
  });
});

describe('contactSchema', () => {
  const validContact = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    message: 'I would like to learn more about your services.',
  };

  it('accepts valid data', () => {
    const result = contactSchema.safeParse(validContact);
    expect(result.success).toBe(true);
  });

  it('rejects empty first name', () => {
    const result = contactSchema.safeParse({ ...validContact, firstName: '' });
    expect(result.success).toBe(false);
  });

  it('rejects short message', () => {
    const result = contactSchema.safeParse({ ...validContact, message: 'Hi' });
    expect(result.success).toBe(false);
  });

  it('rejects message over 2000 chars', () => {
    const result = contactSchema.safeParse({ ...validContact, message: 'x'.repeat(2001) });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({ ...validContact, email: 'bad' });
    expect(result.success).toBe(false);
  });

  it('allows optional phone', () => {
    const result = contactSchema.safeParse({ ...validContact, phone: '' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid phone format', () => {
    const result = contactSchema.safeParse({ ...validContact, phone: 'abc' });
    expect(result.success).toBe(false);
  });
});
