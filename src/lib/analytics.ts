export type AnalyticsEvent =
  | 'hero_cta_clicked'
  | 'reality_check_started'
  | 'reality_check_step_completed'
  | 'reality_check_submitted'
  | 'reality_check_abandoned'
  | 'pricing_viewed'
  | 'reality_sprint_clicked'
  | 'article_cta_clicked'
  | 'tool_selected';
export function track(
  name: AnalyticsEvent,
  properties: Record<string, string | number | boolean> = {},
) {
  // No provider, cookies, network calls or personal form data by default.
  window.dispatchEvent(
    new CustomEvent('real-product:analytics', { detail: { name, properties } }),
  );
}
if (typeof document !== 'undefined') {
  document.addEventListener('click', (event) => {
    const target = (event.target as Element).closest<HTMLElement>(
      '[data-event]',
    );
    if (target?.dataset.event) track(target.dataset.event as AnalyticsEvent);
  });
  const pricing = document.querySelector('[data-track-pricing]');
  if (pricing) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        track('pricing_viewed');
        observer.disconnect();
      }
    });
    observer.observe(pricing);
  }
}
