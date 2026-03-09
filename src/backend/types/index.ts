// Shared backend types for MapleKey Media

export interface BookingRequest {
  idempotency_key?: string;
  package_id: string;
  package_name: string;
  base_price: number;
  add_on_ids: string[];
  total_price: number;
  session_date: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  property_address: string;
  notes?: string;
}

export interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  honeypot?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
