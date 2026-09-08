import { animate } from 'animejs';

for (const host of document.querySelectorAll<HTMLElement>('.request-orbital')) {
  const rings = host.querySelectorAll<HTMLElement>('.request-orbits > i');
  const needle = host.querySelector<SVGElement>('.compass-needle')!;
  const button = host.querySelector<HTMLButtonElement>('.compass-motion')!;
  const label = button.querySelector<HTMLElement>('[data-motion-label]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let paused = false;
  const motions = [
    animate(rings[0], {
      rotateX: [0, 48],
      rotateY: [55, 110],
      rotateZ: [-25, 40],
      duration: 11000,
      alternate: true,
      loop: true,
      autoplay: false,
      ease: 'inOutSine',
    }),
    animate(rings[1], {
      rotateX: [0, 30],
      rotateY: [-55, -110],
      rotateZ: [25, -35],
      duration: 14000,
      alternate: true,
      loop: true,
      autoplay: false,
      ease: 'inOutSine',
    }),
    animate(rings[2], {
      rotateX: [70, 110],
      rotateY: [0, -18],
      rotateZ: [0, 80],
      duration: 18000,
      alternate: true,
      loop: true,
      autoplay: false,
      ease: 'inOutSine',
    }),
  ];
  let needleMotion: ReturnType<typeof animate> | undefined;
  function point() {
    needleMotion?.cancel();
    const direction =
      ({ '0': -55, '1': 85, '2': 205, sent: 360 } as Record<string, number>)[
        host.dataset.stage ?? '0'
      ] ?? -55;
    if (reduced.matches || paused || !visible || document.hidden) {
      needle.style.transform = `rotate(${direction}deg)`;
    } else {
      needleMotion = animate(needle, {
        rotate: direction,
        duration: 1100,
        ease: 'outQuint',
      });
    }
  }
  function sync() {
    const running = visible && !document.hidden && !paused && !reduced.matches;
    motions.forEach((animation) =>
      running ? animation.play() : animation.pause(),
    );
    if (!running) point();
    button.hidden = reduced.matches;
    button.setAttribute('aria-pressed', String(paused));
    label.textContent = paused ? 'Resume motion' : 'Pause motion';
    button.firstElementChild!.textContent = paused ? '▷' : 'Ⅱ';
  }
  button.addEventListener('click', () => {
    paused = !paused;
    sync();
  });
  const intersection = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      sync();
    },
    { threshold: 0.15 },
  );
  intersection.observe(host);
  const stages = new MutationObserver(point);
  stages.observe(host, { attributes: true, attributeFilter: ['data-stage'] });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  point();
  sync();
  window.addEventListener(
    'pagehide',
    (event) => {
      if (event.persisted) return;
      motions.forEach((animation) => animation.cancel());
      needleMotion?.cancel();
      stages.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
    },
    { once: true },
  );
}
