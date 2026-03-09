import { z } from 'zod';

export const bookingSchema = z.object({
  client_name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  client_email: z.string().trim().email('Please enter a valid email address').max(255),
  client_phone: z.string().trim().regex(/^[\d\s\-+()]{7,20}$/, 'Invalid phone format').optional().or(z.literal('')),
  property_address: z.string().trim().min(5, 'Address must be at least 5 characters').max(300),
  notes: z.string().max(1000, 'Notes must be under 1000 characters').optional().or(z.literal('')),
  session_date: z.date({ required_error: 'Please select a date' })
    .refine((d) => d >= new Date(new Date().toDateString()), 'Date must be in the future')
    .refine((d) => d.getDay() !== 0, 'Sundays are not available'),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(255),
  phone: z.string().trim().regex(/^[\d\s\-+()]{7,20}$/, 'Invalid phone format').optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be under 2000 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
