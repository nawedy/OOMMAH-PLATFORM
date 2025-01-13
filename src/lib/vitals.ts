import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  (navigator.sendBeacon && navigator.sendBeacon('/api/vitals', body)) ||
    fetch('/api/vitals', { body, method: 'POST', keepalive: true });
}

export function reportWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getLCP(sendToAnalytics);
}

