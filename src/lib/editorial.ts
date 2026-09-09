import { animate } from 'animejs';
import { mountRealitySculpture } from './reality-sculpture';
import { clientStrings } from '@/i18n/client';

const t = clientStrings();
mountRealitySculpture();
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
for (const host of document.querySelectorAll<HTMLElement>('[data-scenes]')) {
  const tabs = Array.from(
    host.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
  );
  const panels = Array.from(
    host.querySelectorAll<HTMLElement>('[role="tabpanel"]'),
  );
  function choose(index: number, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    host.dispatchEvent(new CustomEvent('reality:scene', { detail: index }));
    if (focus) tabs[index].focus();
    if (!reduced.matches)
      panels[index].querySelector<HTMLButtonElement>('.scene-replay')?.click();
    if (!reduced.matches)
      animate(panels[index], {
        opacity: [0.3, 1],
        translateY: [10, 0],
        duration: 350,
        ease: 'outCubic',
      });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => choose(index));
    tab.addEventListener('keydown', (e) => {
      let next = index;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight')
        next = (index + 1) % tabs.length;
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft')
        next = (index - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      else return;
      e.preventDefault();
      choose(next, true);
    });
  });
}
if (!reduced.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
    },
    { threshold: 0.15 },
  );
  document
    .querySelectorAll('.opening-built,.release-path li,.journal-volume')
    .forEach((el) => observer.observe(el));
}

// A controlled exploded view makes the relationship between parts tangible.
for (const panel of document.querySelectorAll<HTMLElement>(
  '.scene-panels article',
)) {
  const scene = panel.closest<HTMLElement>('[data-scenes]')!;
  const slider = panel.querySelector<HTMLInputElement>('.scene-depth')!;
  const replay = panel.querySelector<HTMLButtonElement>('.scene-replay')!;
  let animation: ReturnType<typeof animate> | undefined;
  function spread(value: number) {
    slider.value = String(value);
    slider.setAttribute(
      'aria-valuetext',
      value === 0
        ? t.perspective.front
        : value === 100
          ? t.perspective.side
          : t.perspective.partial(value),
    );
    scene.dispatchEvent(
      new CustomEvent('reality:perspective', { detail: value }),
    );
  }
  slider.addEventListener('input', () => {
    animation?.cancel();
    spread(Number(slider.value));
  });
  replay.addEventListener('click', () => {
    animation?.cancel();
    if (reduced.matches) {
      spread(Number(slider.value) === 0 ? 100 : 0);
      return;
    }
    const state = { value: 0 };
    animation = animate(state, {
      value: [0, 100, 0],
      duration: 1400,
      ease: 'inOutCubic',
      onUpdate: () => spread(Math.round(state.value)),
    });
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) animation?.cancel();
  });
}

// Findings remain explicitly illustrative; interaction explains priorities, not scan results.
const examples = t.findings.items.flatMap((item) => [
  [t.findings.why, item.why],
  [t.findings.next, item.next],
]);

for (const host of document.querySelectorAll<HTMLElement>(
  '[data-report-explorer]',
)) {
  const rows = Array.from(host.querySelectorAll<HTMLElement>('.report-row'));
  rows.forEach((row, i) => {
    const contents = Array.from(row.childNodes);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'finding-toggle';
    button.append(...contents);
    button.setAttribute('aria-expanded', 'false');
    const icon = document.createElement('span');
    icon.className = 'finding-plus';
    icon.textContent = '+';
    icon.setAttribute('aria-hidden', 'true');
    button.append(icon);
    const detail = document.createElement('div');
    detail.className = 'finding-detail';
    detail.id = `finding-detail-${i}`;
    detail.hidden = true;
    button.setAttribute('aria-controls', detail.id);
    for (const [term, copy] of examples.slice(i * 2, i * 2 + 2)) {
      const label = document.createElement('strong');
      label.textContent = term;
      const body = document.createElement('p');
      body.textContent = copy;
      detail.append(label, body);
    }
    row.append(button, detail);
    button.addEventListener('click', () => {
      const open = detail.hidden;
      rows.forEach((other) => {
        other.querySelector('button')?.setAttribute('aria-expanded', 'false');
        const body = other.querySelector<HTMLElement>('.finding-detail');
        if (body) body.hidden = true;
      });
      detail.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      if (open && !reduced.matches)
        animate(detail, {
          opacity: [0.2, 1],
          translateY: [-6, 0],
          duration: 300,
          ease: 'outCubic',
        });
    });
  });
  host.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((button) =>
    button.addEventListener('click', () => {
      host
        .querySelectorAll('[data-filter]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      rows.forEach((row, i) => {
        row.hidden = button.dataset.filter === 'blockers' && i > 1;
      });
      if (!reduced.matches)
        animate(
          rows.filter((r) => !r.hidden),
          {
            opacity: [0.35, 1],
            translateX: [8, 0],
            duration: 300,
            ease: 'outCubic',
          },
        );
    }),
  );
}
