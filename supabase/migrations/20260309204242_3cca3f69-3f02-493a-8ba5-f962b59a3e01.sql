
-- Create booking status enum
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Create contact status enum
CREATE TYPE public.contact_status AS ENUM ('new', 'read', 'replied');

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  idempotency_key TEXT UNIQUE,
  package_id TEXT NOT NULL,
  package_name TEXT NOT NULL,
  base_price INTEGER NOT NULL,
  add_on_ids TEXT[] NOT NULL DEFAULT '{}',
  total_price INTEGER NOT NULL,
  session_date DATE NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  property_address TEXT NOT NULL,
  notes TEXT,
  status booking_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  honeypot TEXT,
  status contact_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- No public read policies — only service role (edge functions) can write
-- Admin reads would be via authenticated session with role check (future)

-- Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for bookings updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for common queries
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_session_date ON public.bookings(session_date);
CREATE INDEX idx_bookings_client_email ON public.bookings(client_email);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX idx_bookings_idempotency ON public.bookings(idempotency_key);
