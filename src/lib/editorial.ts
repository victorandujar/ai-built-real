import { animate } from 'animejs';
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
    if (focus) tabs[index].focus();
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
