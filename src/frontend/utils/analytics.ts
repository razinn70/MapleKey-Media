/**
 * GA4 Analytics utility.
 * Fires gtag events when the GA4 script is loaded.
 * Safe no-op if gtag is not present (dev environment).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export const trackEvent = (eventName: string, params?: EventParams): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

// Pre-defined events for type safety
export const analytics = {
  bookingSubmitted: (params: {
    package_name: string;
    total_price: number;
    add_on_count: number;
  }) => trackEvent('booking_submitted', params),

  contactSubmitted: () => trackEvent('contact_form_submitted'),

  bookingConfirmed: (params: {
    package_name: string;
    total_price: number;
  }) => trackEvent('booking_confirmed', params),

  checkoutStarted: (params: {
    package_name: string;
    total_price: number;
  }) => trackEvent('begin_checkout', {
    currency: 'CAD',
    value: params.total_price,
    items: params.package_name,
  }),

  galleryViewed: (category: string) => trackEvent('gallery_viewed', { category }),

  ctaClicked: (label: string) => trackEvent('cta_clicked', { label }),
};
