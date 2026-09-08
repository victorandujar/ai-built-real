import { animate, stagger } from 'animejs';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if (!reduced.matches) {
  // Content is visible without scripts. Animate only when it enters the viewport.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        animate(entry.target, {
          opacity: [0.35, 1],
          translateY: [24, 0],
          duration: 650,
          ease: 'outExpo',
        });
      }
    },
    { threshold: 0.08 },
  );
  document
    .querySelectorAll(
      '.section .split,.section-heading,.belief,.note-link,.step,.closing h2',
    )
    .forEach((el) => observer.observe(el));
  const heroLines = document.querySelectorAll('.hero-line');
  if (heroLines.length)
    animate(heroLines, {
      translateY: [30, 0],
      opacity: [0.55, 1],
      delay: stagger(65),
      duration: 720,
      ease: 'outExpo',
    });
  reduced.addEventListener('change', () => {
    if (reduced.matches) observer.disconnect();
  });
}
// Native disclosure remains keyboard accessible; animate its visible body.
document.querySelectorAll('details').forEach((details) =>
  details.addEventListener('toggle', () => {
    if (details.open && !reduced.matches) {
      const children = Array.from(details.children).filter(
        (el) => el.tagName !== 'SUMMARY',
      );
      animate(children, {
        opacity: [0, 1],
        translateY: [-5, 0],
        duration: 250,
        ease: 'outQuad',
      });
    }
  }),
);
