import { clientStrings } from '@/i18n/client';

/** Native form values with an enhanced, keyboard-operated select-only combobox. */
export function enhanceSelects(form: HTMLFormElement) {
  const t = clientStrings();
  for (const select of form.querySelectorAll<HTMLSelectElement>('select')) {
    const label = form.querySelector<HTMLLabelElement>(
      `label[for="${select.id}"]`,
    )!;
    label.id ||= `${select.id}-label`;
    const wrap = document.createElement('div');
    wrap.className = 'choice';
    select.before(wrap);
    wrap.append(select);
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.id = `${select.id}-choice`;
    trigger.className = 'choice-trigger';
    trigger.setAttribute('role', 'combobox');
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-labelledby', label.id);
    trigger.setAttribute('aria-required', String(select.required));
    trigger.setAttribute(
      'aria-describedby',
      select.getAttribute('aria-describedby') || '',
    );
    const value = document.createElement('span');
    const chevron = document.createElement('span');
    chevron.className = 'choice-chevron';
    chevron.textContent = '⌄';
    chevron.setAttribute('aria-hidden', 'true');
    trigger.append(value, chevron);
    const menu = document.createElement('div');
    menu.className = 'choice-menu';
    menu.id = `${select.id}-options`;
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-labelledby', label.id);
    menu.hidden = true;
    trigger.setAttribute('aria-controls', menu.id);
    const options = Array.from(select.options).filter((o) => o.value);
    const items = options.map((option, index) => {
      const item = document.createElement('div');
      item.className = 'choice-option';
      item.id = `${select.id}-option-${index}`;
      item.setAttribute('role', 'option');
      const title = document.createElement('span');
      title.textContent = option.text;
      const mark = document.createElement('span');
      mark.textContent = '✓';
      mark.setAttribute('aria-hidden', 'true');
      item.append(title, mark);
      menu.append(item);
      item.addEventListener('pointerdown', (e) => e.preventDefault());
      item.addEventListener('click', () => choose(index));
      return item;
    });
    wrap.append(trigger, menu);
    // Preserve native controls when JS is unavailable; enhance only after construction.
    select.hidden = true;
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');
    label.htmlFor = trigger.id;
    let active = 0,
      search = '',
      lastKey = 0;
    function sync() {
      value.textContent = select.selectedOptions[0]?.text || t.chooseOne;
      trigger.dataset.empty = String(!select.value);
      trigger.setAttribute(
        'aria-invalid',
        select.getAttribute('aria-invalid') || 'false',
      );
      items.forEach((item, i) =>
        item.setAttribute(
          'aria-selected',
          String(options[i].value === select.value),
        ),
      );
    }
    function close() {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.removeAttribute('aria-activedescendant');
    }
    function highlight(index: number) {
      active = Math.max(0, Math.min(items.length - 1, index));
      items.forEach((item, i) => (item.dataset.active = String(i === active)));
      trigger.setAttribute('aria-activedescendant', items[active].id);
      items[active].scrollIntoView({ block: 'nearest' });
    }
    function open() {
      form.dispatchEvent(new CustomEvent('choices:close'));
      const rect = trigger.getBoundingClientRect();
      wrap.dataset.up = String(
        window.innerHeight - rect.bottom < 260 && rect.top > 270,
      );
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      highlight(
        Math.max(
          0,
          options.findIndex((o) => o.value === select.value),
        ),
      );
    }
    function choose(index: number) {
      select.value = options[index].value;
      select.dispatchEvent(new Event('input', { bubbles: true }));
      select.dispatchEvent(new Event('change', { bubbles: true }));
      sync();
      close();
      trigger.focus();
    }
    trigger.addEventListener('click', () => (menu.hidden ? open() : close()));
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        close();
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (
        ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(e.key)
      ) {
        e.preventDefault();
        if (menu.hidden) {
          open();
          return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
          choose(active);
          return;
        }
        highlight(
          e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? items.length - 1
              : active + (e.key === 'ArrowDown' ? 1 : -1),
        );
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        if (menu.hidden) open();
        const now = Date.now();
        search = (now - lastKey > 650 ? '' : search) + e.key.toLowerCase();
        lastKey = now;
        const match = options.findIndex((o) =>
          o.text.toLowerCase().startsWith(search),
        );
        if (match >= 0) highlight(match);
      }
    });
    wrap.addEventListener('focusout', (e) => {
      if (!wrap.contains(e.relatedTarget as Node)) {
        close();
        select.dispatchEvent(new Event('blur'));
      }
    });
    document.addEventListener('pointerdown', (e) => {
      if (!wrap.contains(e.target as Node)) close();
    });
    form.addEventListener('choices:close', close);
    select.addEventListener('change', sync);
    new MutationObserver(sync).observe(select, {
      attributes: true,
      attributeFilter: ['aria-invalid'],
    });
    form.addEventListener('reset', () => queueMicrotask(sync));
    sync();
  }
}
export function focusField(field: HTMLElement) {
  const target =
    field instanceof HTMLSelectElement
      ? document.getElementById(`${field.id}-choice`)
      : field;
  target?.focus();
}
