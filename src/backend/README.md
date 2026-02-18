# Backend

This folder contains all backend logic for MapleKey Media.

## Structure

```
src/backend/
├── api/          # API route handlers & edge functions
├── services/     # Business logic (booking, email, payments)
├── types/        # Shared TypeScript types & interfaces
├── utils/        # Backend utility functions
└── README.md
```

## Getting Started

Enable **Lovable Cloud** to activate the backend infrastructure:
- PostgreSQL database
- Authentication (email/password, OAuth)
- File storage (property photos, documents)
- Serverless edge functions (email notifications, Stripe payments)

## Planned Modules

- **Booking Service**: Persist session bookings, send confirmation emails
- **Contact Service**: Handle contact form submissions
- **Auth Service**: Client/admin portal authentication
- **Storage Service**: Property media file management
- **Payment Service**: Stripe integration for session payments
