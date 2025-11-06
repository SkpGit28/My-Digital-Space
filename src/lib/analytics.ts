type EventType = 'page_view' | 'click' | 'form_submit' | 'error';

export const track = (name: string, payload?: Record<string, unknown>) => {
  if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
    (window as any).plausible?.(name, { props: payload });
  }
  // else GA4 or no-op
};

export const trackPageView = (pageName: string) => {
  track('page_view', { page: pageName });
};

export const trackClick = (elementName: string, properties?: Record<string, unknown>) => {
  track('click', { element: elementName, ...properties });
};

export const trackFormSubmit = (formName: string, properties?: Record<string, unknown>) => {
  track('form_submit', { form: formName, ...properties });
};

export const trackError = (errorName: string, properties?: Record<string, unknown>) => {
  track('error', { error: errorName, ...properties });
};
