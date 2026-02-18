// Shared backend types for MapleKey Media

export interface BookingRequest {
  service: string;
  date: string;
  name: string;
  email: string;
  phone?: string;
  address: string;
  notes?: string;
}

export interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
