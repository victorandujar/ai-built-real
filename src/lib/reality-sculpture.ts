/** One shared, demand-rendered sculpture. Content stays usable without WebGL. */
export function mountRealitySculpture() {
  const host = document.querySelector<HTMLElement>('[data-scenes]');
  const surface = host?.querySelector<HTMLElement>('[data-reality-sculpture]');
  if (!host || !surface) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;
  let perspective = 0;
  let wake = () => {};
  host.addEventListener('reality:scene', (e) => {
    selected = (e as CustomEvent<number>).detail;
    surface.dataset.scene = String(selected);
    wake();
  });
  host.addEventListener('reality:perspective', (e) => {
    perspective = (e as CustomEvent<number>).detail / 100;
    wake();
  });
  let visible = false;
  let started = false;
  const observer = new IntersectionObserver(
    async ([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) return;
      if (started) {
        wake();
        return;
      }
      started = true;
      try {
        const T = await import('./three-exports');
        const renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.55;
        const scene = new T.Scene();
        const camera = new T.PerspectiveCamera(37, 1, 0.1, 30);
        camera.position.z = 7.7;
        const group = new T.Group();
        scene.add(group);
        scene.add(new T.HemisphereLight(0xfff1de, 0x33392e, 3));
        const key = new T.DirectionalLight(0xffe8d0, 5);
        key.position.set(-3, 4, 5);
        scene.add(key);
        const rim = new T.DirectionalLight(0xf8f8f0, 4);
        rim.position.set(4, 1, -2);
        scene.add(rim);
        const clay = new T.MeshStandardMaterial({
          color: 0xd54c2e,
          roughness: 0.26,
          metalness: 0.32,
        });
        const pearl = new T.MeshStandardMaterial({
          color: 0xe6d9be,
          roughness: 0.22,
          metalness: 0.62,
        });
        const sphere = new T.SphereGeometry(1, 40, 24);
        const torus = new T.TorusGeometry(1.32, 0.18, 20, 100);
        const rings = Array.from({ length: 3 }, (_, i) => {
          const mesh = new T.Mesh(torus, i === 0 ? clay : pearl);
          group.add(mesh);
          return mesh;
        });
        const dots = Array.from({ length: 8 }, (_, i) => {
          const mesh = new T.Mesh(sphere, i % 3 === 0 ? pearl : clay);
          mesh.scale.setScalar(0.001);
          group.add(mesh);
          return mesh;
        });
        let frame = 0;
        let until = 0;
        let pointerX = 0,
          pointerY = 0;
        let angle = 0;
        let disposed = false;
        function render(now: number) {
          frame = 0;
          if (disposed || !visible || document.hidden) return;
          const smooth = motion.matches ? 1 : 0.085;
          angle += (perspective * 1.5 + pointerX * 0.35 - angle) * smooth;
          group.rotation.y = angle;
          group.rotation.x +=
            (-0.16 + pointerY * 0.2 - group.rotation.x) * smooth;
          rings.forEach((mesh, i) => {
            const split = selected === 1;
            const payment = selected === 2;
            const signal = selected === 3;
            const x = split ? (i - 0.5) * 2.1 : payment ? (i - 1) * 0.88 : 0;
            const y = signal ? (i - 1) * 0.72 : 0;
            const scale = split
              ? i === 2
                ? 0.001
                : 0.68
              : signal
                ? 1 - i * 0.22
                : payment
                  ? 0.8
                  : 1 - i * 0.18;
            mesh.position.x += (x - mesh.position.x) * smooth;
            mesh.position.y += (y - mesh.position.y) * smooth;
            mesh.rotation.x +=
              ((signal ? 1.15 : split ? 0.15 : i * 0.86 + 0.25) -
                mesh.rotation.x) *
              smooth;
            mesh.rotation.y +=
              ((split ? 0.15 : i * 0.9) - mesh.rotation.y) * smooth;
            mesh.scale.x += (scale - mesh.scale.x) * smooth;
            mesh.scale.setScalar(mesh.scale.x);
          });
          dots.forEach((mesh, i) => {
            const a = (i * Math.PI) / 4;
            const orbit = selected === 0;
            const x = orbit
              ? Math.cos(a) * 1.85
              : selected === 1
                ? ((i % 2) - 0.5) * 2.1
                : selected === 2
                  ? (i - 3.5) * 0.44
                  : Math.sin(i * 1.5) * 0.5;
            const y = orbit
              ? Math.sin(a) * 1.48
              : selected === 1
                ? (Math.floor(i / 2) - 1.5) * 0.32
                : selected === 2
                  ? Math.sin(a) * 0.25
                  : (i - 3.5) * 0.38;
            const z = orbit ? Math.sin(a * 2) * 0.6 : 0;
            const scale = orbit
              ? i === 0
                ? 0.44
                : 0.19
              : selected === 1
                ? 0.22
                : 0.16;
            mesh.position.x += (x - mesh.position.x) * smooth;
            mesh.position.y += (y - mesh.position.y) * smooth;
            mesh.position.z += (z - mesh.position.z) * smooth;
            mesh.scale.x += (scale - mesh.scale.x) * smooth;
            mesh.scale.setScalar(mesh.scale.x);
          });
          renderer.render(scene, camera);
          if (!motion.matches && now < until)
            frame = requestAnimationFrame(render);
        }
        wake = () => {
          until = performance.now() + 1800;
          if (!frame && !disposed && visible)
            frame = requestAnimationFrame(render);
        };
        const resize = new ResizeObserver(() => {
          renderer.setSize(surface.clientWidth, surface.clientHeight);
          camera.aspect = surface.clientWidth / surface.clientHeight;
          camera.updateProjectionMatrix();
          wake();
        });
        resize.observe(surface);
        surface.append(renderer.domElement);
        surface.classList.add('has-webgl');
        surface.addEventListener('pointermove', (e) => {
          if (motion.matches || e.pointerType !== 'mouse') return;
          const box = surface.getBoundingClientRect();
          pointerX = (e.clientX - box.left) / box.width - 0.5;
          pointerY = (e.clientY - box.top) / box.height - 0.5;
          wake();
        });
        surface.addEventListener('pointerleave', () => {
          pointerX = pointerY = 0;
          wake();
        });
        document.addEventListener('visibilitychange', wake);
        motion.addEventListener('change', wake);
        renderer.domElement.addEventListener('webglcontextlost', () => {
          surface.classList.remove('has-webgl');
          cancelAnimationFrame(frame);
          disposed = true;
        });
        window.addEventListener(
          'pagehide',
          (event) => {
            if (event.persisted) return;
            disposed = true;
            cancelAnimationFrame(frame);
            resize.disconnect();
            observer.disconnect();
            sphere.dispose();
            torus.dispose();
            clay.dispose();
            pearl.dispose();
            renderer.dispose();
          },
          { once: true },
        );
        wake();
      } catch {
        surface.classList.remove('has-webgl');
      }
    },
    { threshold: 0.1 },
  );
  observer.observe(surface);
}
