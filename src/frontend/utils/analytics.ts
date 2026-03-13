/**
 * Multi-channel analytics utility.
 * Fires GA4 (gtag) + TikTok Pixel (ttq) events.
 * Safe no-op if trackers are not present (dev environment).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      identify: (params: Record<string, unknown>) => void;
      page: () => void;
    };
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export const trackEvent = (eventName: string, params?: EventParams): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

/** Fire a TikTok standard event */
const trackTikTok = (event: string, params?: Record<string, unknown>): void => {
  if (window.ttq?.track) {
    window.ttq.track(event, params);
  }
};

// Pre-defined events for type safety
export const analytics = {
  contactSubmitted: () => {
    trackEvent('contact_submitted');
    trackTikTok('SubmitForm');
  },

  bookingStarted: (params: {
    package_name: string;
    total_price: number;
  }) => {
    trackEvent('booking_started', params);
    trackTikTok('AddToCart', {
      content_name: params.package_name,
      value: params.total_price,
      currency: 'CAD',
    });
  },

  bookingCompleted: (params: {
    package_name: string;
    total_price: number;
  }) => {
    trackEvent('booking_completed', params);
  },

  bookingSubmitted: (params: {
    package_name: string;
    total_price: number;
    add_on_count: number;
  }) => {
    trackEvent('booking_submitted', params);
    trackTikTok('PlaceAnOrder', {
      content_name: params.package_name,
      value: params.total_price,
      currency: 'CAD',
    });
  },

  bookingConfirmed: (params: {
    package_name: string;
    total_price: number;
  }) => {
    trackEvent('booking_confirmed', params);
  },

  checkoutStarted: (params: {
    package_name: string;
    total_price: number;
  }) => {
    trackEvent('checkout_started', {
      currency: 'CAD',
      value: params.total_price,
      items: params.package_name,
    });
    trackTikTok('InitiateCheckout', {
      content_name: params.package_name,
      value: params.total_price,
      currency: 'CAD',
    });
  },

  checkoutSuccess: (params: {
    package_name: string;
    total_price: number;
  }) => {
    trackEvent('checkout_success', {
      currency: 'CAD',
      value: params.total_price,
      items: params.package_name,
    });
    trackTikTok('CompletePayment', {
      content_name: params.package_name,
      value: params.total_price,
      currency: 'CAD',
    });
  },

  galleryViewed: (category: string) => {
    trackEvent('gallery_viewed', { category });
    trackTikTok('ViewContent', { content_name: category });
  },

  ctaClicked: (label: string) => {
    trackEvent('cta_clicked', { label });
    trackTikTok('ClickButton', { content_name: label });
  },
};
