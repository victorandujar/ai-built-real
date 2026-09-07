import { track } from './analytics';
import { leadSchema } from './lead-schema';
const form = document.querySelector<HTMLFormElement>('#check-form');
if (form) {
  const steps = Array.from(
    form.querySelectorAll<HTMLFieldSetElement>('[data-step]'),
  );
  let current = 0;
  let started = false;
  let submitted = false;
  let busy = false;
  const back = form.querySelector<HTMLButtonElement>('#back')!;
  const next = form.querySelector<HTMLButtonElement>('#next-button')!;
  const submit = form.querySelector<HTMLButtonElement>('#submit')!;
  const error = form.querySelector<HTMLElement>('#form-error')!;
  const show = () => {
    steps.forEach((s, i) => {
      s.hidden = i !== current;
      s.disabled = i !== current;
    });
    back.hidden = current === 0;
    next.hidden = current === 2;
    submit.hidden = current !== 2;
    form.querySelector('#step-label')!.textContent =
      `Step ${current + 1} of 3 / ${['Your product', 'Your next step', 'Your details'][current]}`;
    form
      .querySelectorAll('.form-progress span')
      .forEach((s, i) => s.classList.toggle('active', i <= current));
    steps[current].querySelector('legend')?.focus();
    error.textContent = '';
  };
  const valid = () => {
    const fields = Array.from(
      steps[current].querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >('input,select,textarea'),
    );
    for (const f of fields) {
      if (!f.checkValidity()) {
        f.reportValidity();
        return false;
      }
    }
    return true;
  };
  form.addEventListener('input', () => {
    if (!started) {
      started = true;
      track('reality_check_started');
    }
  });
  form
    .querySelector<HTMLSelectElement>('#tool')!
    .addEventListener('change', (e) =>
      track('tool_selected', { tool: (e.target as HTMLSelectElement).value }),
    );
  next.addEventListener('click', () => {
    if (valid()) {
      track('reality_check_step_completed', { step: current + 1 });
      current++;
      show();
    }
  });
  back.addEventListener('click', () => {
    if (!busy) {
      current--;
      show();
    }
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (busy) return;
    if (current < 2) {
      next.click();
      return;
    }
    if (!valid()) return;
    steps.forEach((s) => (s.disabled = false));
    const data = Object.fromEntries(new FormData(form));
    steps.forEach((s, i) => (s.disabled = i !== current));
    const parsed = leadSchema.safeParse({
      ...data,
      consent: data.consent === 'on',
      interest:
        new URLSearchParams(location.search).get('interest') === 'sprint'
          ? 'sprint'
          : 'check',
    });
    if (!parsed.success) {
      const field = parsed.error.issues[0]?.path[0];
      const input = form.elements.namedItem(
        String(field),
      ) as HTMLElement | null;
      current = steps.findIndex((s) => input && s.contains(input));
      if (current < 0) current = 0;
      show();
      error.textContent =
        parsed.error.issues[0]?.message || 'Please check your details.';
      input?.focus();
      return;
    }
    busy = true;
    submit.disabled = true;
    back.disabled = true;
    submit.textContent = 'Sending…';
    error.textContent = '';
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(18000),
      });
      const result: { message: string } = await response.json();
      if (!response.ok) throw new Error(result.message);
      submitted = true;
      track('reality_check_step_completed', { step: 3 });
      track('reality_check_submitted');
      form.hidden = true;
      const success = document.querySelector<HTMLElement>('#form-success')!;
      success.hidden = false;
      success.focus();
      form.reset();
    } catch (err) {
      error.textContent =
        err instanceof Error && err.name !== 'TimeoutError'
          ? err.message
          : 'We could not confirm delivery. Your entries are still here; please try again.';
    } finally {
      busy = false;
      submit.disabled = false;
      back.disabled = false;
      submit.textContent = 'Check my product ↗';
    }
  });
  window.addEventListener('pagehide', () => {
    if (started && !submitted)
      track('reality_check_abandoned', { step: current + 1 });
  });
}
