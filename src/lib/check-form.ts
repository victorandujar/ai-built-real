import { animate } from 'animejs';
import { enhanceSelects, focusField } from './selects';
import { track } from './analytics';
import { clientStrings } from '@/i18n/client';
const form = document.querySelector<HTMLFormElement>('#check-form');
if (form) {
  const t = clientStrings();
  enhanceSelects(form);
  const guidance = form.querySelector<HTMLElement>('#step-guidance')!;
  const requestObject = document.querySelector<HTMLElement>(
    '[data-request-object]',
  );
  let sendTimer: ReturnType<typeof setTimeout> | undefined;
  type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  const steps = Array.from(
    form.querySelectorAll<HTMLFieldSetElement>('[data-step]'),
  );
  const progressButtons = Array.from(
    form.querySelectorAll<HTMLButtonElement>('[data-go-step]'),
  );
  const back = form.querySelector<HTMLButtonElement>('#back')!;
  const next = form.querySelector<HTMLButtonElement>('#next-button')!;
  const submit = form.querySelector<HTMLButtonElement>('#submit')!;
  const label = submit.querySelector<HTMLElement>('[data-submit-label]')!;
  const icon = submit.querySelector<HTMLElement>('[data-submit-icon]')!;
  const alert = form.querySelector<HTMLElement>('#form-error')!;
  const alertTitle = form.querySelector<HTMLElement>('#error-title')!;
  const alertMessage = form.querySelector<HTMLElement>('#error-message')!;
  const sending = form.querySelector<HTMLElement>('#sending-note')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0,
    furthest = 0;
  let started = false,
    submitted = false,
    busy = false;
  const getField = (name: string) =>
    form.elements.namedItem(name) as Field | null;
  /** Option values stay English for the schema; the summary shows what was read. */
  const chosenText = (name: string) => {
    const field = getField(name);
    return field instanceof HTMLSelectElement
      ? (field.selectedOptions[0]?.text ?? '')
      : (field?.value ?? '');
  };
  function fieldError(field: Field, message: string) {
    const target = document.getElementById(`${field.name}-error`);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    if (target) {
      target.textContent = message;
      target.hidden = !message;
    }
  }
  function messageFor(field: Field) {
    const value = field.value.trim();
    if (field instanceof HTMLInputElement && field.type === 'checkbox')
      return field.checked ? '' : t.form.errors.consent;
    if (field.required && !value)
      return field instanceof HTMLSelectElement
        ? t.form.errors.chooseOption
        : t.form.errors.required;
    if (!value) return '';
    if (field instanceof HTMLInputElement && field.type === 'url') {
      try {
        const url = new URL(value);
        if (
          !['http:', 'https:'].includes(url.protocol) ||
          url.username ||
          url.password
        )
          return t.form.errors.urlCredentials;
      } catch {
        return t.form.errors.url;
      }
    }
    if (
      field instanceof HTMLInputElement &&
      field.type === 'email' &&
      field.validity.typeMismatch
    )
      return t.form.errors.email;
    if (
      'minLength' in field &&
      field.minLength > 0 &&
      value.length < field.minLength
    )
      return field.name === 'description'
        ? t.form.errors.description
        : field.name === 'name'
          ? t.form.errors.name
          : t.form.errors.minLength;
    return field.validity.valid ? '' : field.validationMessage;
  }
  function validateStep() {
    let first: Field | undefined;
    for (const field of steps[current].querySelectorAll<Field>(
      'input,textarea,select',
    )) {
      const message = messageFor(field);
      fieldError(field, message);
      if (message && !first) first = field;
    }
    if (first) {
      focusField(first);
      guidance.textContent = t.form.needsDetail;
      return false;
    }
    return true;
  }
  function show() {
    form!.dispatchEvent(new CustomEvent('choices:close'));
    form!.dataset.state = 'editing';
    guidance.textContent = t.form.guidance[current];
    if (requestObject) {
      requestObject.dataset.stage = String(current);
      requestObject.querySelector('[data-brief-caption]')!.textContent =
        t.form.briefCaptions[current];
    }
    steps.forEach((step, i) => {
      step.hidden = i !== current;
      step.disabled = i !== current;
    });
    back.hidden = current === 0;
    next.hidden = current === 2;
    submit.hidden = current !== 2;
    form!.querySelector('#step-label')!.textContent =
      `0${current + 1} / ${t.form.stepNames[current]}`;
    (form!.querySelector('.form-progress i') as HTMLElement).style.width =
      `${((current + 1) / 3) * 100}%`;
    progressButtons.forEach((button, i) => {
      button.disabled = i > furthest || busy;
      button.dataset.complete = String(i < current);
      button.textContent = i < current ? '✓' : String(i + 1);
      if (i === current) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    alert.hidden = true;
    if (current === 2) {
      form!.querySelector('#review-product')!.textContent =
        getField('productUrl')?.value || '';
      form!.querySelector('#review-stage')!.textContent = t.form.reviewStage(
        chosenText('tool'),
        chosenText('next'),
      );
    }
    steps[current]
      .querySelector<HTMLElement>('legend')
      ?.focus({ preventScroll: true });
    if (!reduced.matches)
      animate(steps[current], {
        opacity: [0.2, 1],
        translateX: [14, 0],
        duration: 330,
        ease: 'outCubic',
      });
    if (form!.getBoundingClientRect().top < 0)
      form!.scrollIntoView({
        block: 'start',
        behavior: reduced.matches ? 'instant' : 'smooth',
      });
  }
  for (const field of form.querySelectorAll<Field>(
    'fieldset input,fieldset textarea,fieldset select',
  )) {
    field.addEventListener('blur', () => {
      if (!busy) fieldError(field, messageFor(field));
    });
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true' && !messageFor(field))
        fieldError(field, '');
    });
  }
  form.addEventListener('input', () => {
    if (!started) {
      started = true;
      track('reality_check_started');
    }
  });
  getField('tool')?.addEventListener('change', (e) =>
    track('tool_selected', { tool: (e.target as HTMLSelectElement).value }),
  );
  next.addEventListener('click', () => {
    if (!busy && validateStep()) {
      track('reality_check_step_completed', { step: current + 1 });
      current++;
      furthest = Math.max(furthest, current);
      show();
    }
  });
  back.addEventListener('click', () => {
    if (!busy && current > 0) {
      current--;
      show();
    }
  });
  progressButtons.forEach((button, i) =>
    button.addEventListener('click', () => {
      if (busy || i > furthest) return;
      if (i > current && !validateStep()) return;
      current = i;
      show();
    }),
  );
  function setBusy(value: boolean) {
    busy = value;
    form!.setAttribute('aria-busy', String(value));
    submit.disabled = value;
    back.disabled = value;
    next.disabled = value;
    progressButtons.forEach((b, i) => (b.disabled = value || i > furthest));
    steps[current].disabled = value;
    form!.dispatchEvent(new CustomEvent('choices:close'));
    if (value) {
      form!.dataset.state = 'sending';
      form!.querySelector('#sending-message')!.textContent = t.form.sending;
      sendTimer = setTimeout(() => {
        form!.querySelector('#sending-message')!.textContent =
          t.form.stillSending;
      }, 6000);
    } else {
      clearTimeout(sendTimer);
    }
    sending.hidden = !value;
    label.textContent = value ? t.form.sendingLabel : t.form.submit;
    icon.classList.toggle('spinner', value);
    icon.textContent = value ? '' : '↗';
  }
  form.querySelector('#edit-brief')?.addEventListener('click', () => {
    if (!busy) {
      current = 0;
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
    if (!validateStep()) return;
    steps.forEach((s) => (s.disabled = false));
    const values = Object.fromEntries(new FormData(form));
    steps.forEach((s, i) => (s.disabled = i !== current));
    alert.hidden = true;
    setBusy(true);
    try {
      const { leadSchema } = await import('./lead-schema');
      const parsed = leadSchema.safeParse({
        ...values,
        consent: values.consent === 'on',
        interest:
          new URLSearchParams(location.search).get('interest') === 'sprint'
            ? 'sprint'
            : 'check',
      });
      if (!parsed.success) {
        setBusy(false);
        const issue = parsed.error.issues[0];
        const field = getField(String(issue?.path[0]));
        if (field) {
          current = Math.max(
            0,
            steps.findIndex((s) => s.contains(field)),
          );
          show();
          fieldError(field, issue?.message || t.form.errors.generic);
          focusField(field);
        }
        return;
      }
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...parsed.data,
          locale: document.documentElement.lang.slice(0, 2),
        }),
        signal: AbortSignal.timeout(18000),
      });
      let result: { message?: string } = {};
      try {
        result = await response.json();
      } catch {}
      if (!response.ok) {
        alertTitle.textContent =
          response.status === 429
            ? t.form.alerts.tooMany
            : response.status === 503
              ? t.form.alerts.unconfirmed
              : t.form.alerts.needsLook;
        throw new Error(result.message || t.form.alerts.unavailable);
      }
      if (typeof result.message !== 'string' || !result.message.trim()) {
        alertTitle.textContent = t.form.alerts.undelivered;
        throw new Error(t.form.alerts.unexpected);
      }
      submitted = true;
      form.dataset.state = 'success';
      if (requestObject) requestObject.dataset.stage = 'sent';
      document.querySelector('#success-email')!.textContent = parsed.data.email;
      track('reality_check_step_completed', { step: 3 });
      track('reality_check_submitted');
      form.hidden = true;
      const success = document.querySelector<HTMLElement>('#form-success')!;
      success.hidden = false;
      success.focus();
      if (!reduced.matches)
        animate(success, {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 450,
          ease: 'outExpo',
        });
      form.reset();
    } catch (err) {
      form.dataset.state = 'error';
      if (
        err instanceof Error &&
        ['TimeoutError', 'AbortError', 'TypeError'].includes(err.name)
      ) {
        alertTitle.textContent = t.form.alerts.undelivered;
        alertMessage.textContent = t.form.alerts.offline;
      } else {
        alertMessage.textContent =
          err instanceof Error ? err.message : t.form.alerts.retry;
      }
      alert.hidden = false;
      alert.focus({ preventScroll: true });
      if (!reduced.matches)
        animate(alert, { opacity: [0, 1], translateY: [5, 0], duration: 220 });
    } finally {
      setBusy(false);
      if (!submitted && !alert.hidden) label.textContent = t.form.tryAgain;
    }
  });
  window.addEventListener('pagehide', () => {
    if (started && !submitted)
      track('reality_check_abandoned', { step: current + 1 });
  });
}
