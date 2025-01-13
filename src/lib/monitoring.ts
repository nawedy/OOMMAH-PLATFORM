import * as Sentry from '@sentry/nextjs';

export function initializeMonitoring() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: process.env.NODE_ENV === 'development',
      environment: process.env.NODE_ENV,
      integrations: [
        new Sentry.BrowserTracing({
          traceFetch: true,
          traceXHR: true,
        }),
      ],
    });
  }
}

