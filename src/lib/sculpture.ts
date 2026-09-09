import { clientStrings } from '@/i18n/client';

export async function initSculpture(host: HTMLElement) {
  const t = clientStrings();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = host.querySelector<HTMLButtonElement>('#assemble')!;
  const pause = host.querySelector<HTMLButtonElement>('#pause-scene')!;
  const status = host.querySelector<HTMLElement>('#assembly-status')!;
  let assembled = false;
  let paused = false;
  let redraw: (() => void) | undefined;
  let cleanup: (() => void) | undefined;
  toggle.addEventListener('click', () => {
    assembled = !assembled;
    host.dataset.assembled = String(assembled);
    toggle.setAttribute('aria-pressed', String(assembled));
    toggle.setAttribute(
      'aria-label',
      assembled ? t.sculpture.separateLabel : t.sculpture.assembleLabel,
    );
    host.querySelector('[data-assembly-label]')!.textContent = assembled
      ? t.sculpture.separate
      : t.sculpture.assemble;
    status.textContent = assembled
      ? t.sculpture.product
      : t.sculpture.prototype;
    redraw?.();
  });
  if (reduced.matches) return;
  // Three is fetched only for a visible, motion-enabled hero, after the text is ready.
  const observer = new IntersectionObserver(
    async (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      observer.disconnect();
      try {
        const THREE = await import('./three-exports');
        const { RoundedBoxGeometry } =
          await import('three/addons/geometries/RoundedBoxGeometry.js');
        if (reduced.matches) return;
        const stage = host.querySelector<HTMLElement>('#sculpture-stage')!;
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        });
        renderer.setPixelRatio(
          Math.min(
            window.devicePixelRatio,
            matchMedia('(max-width:640px)').matches ? 1.25 : 1.7,
          ),
        );
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = false;

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        stage.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
        camera.position.set(7, 5, 10);
        camera.lookAt(0, 0.2, 0);
        scene.add(new THREE.HemisphereLight(0xfffaf0, 0x62554a, 3));
        const key = new THREE.DirectionalLight(0xfff5e4, 5);
        key.position.set(-4, 8, 6);
        key.castShadow = false;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.left = -6;
        key.shadow.camera.right = 6;
        key.shadow.camera.top = 6;
        key.shadow.camera.bottom = -6;
        key.shadow.normalBias = 0.025;
        key.shadow.bias = -0.0001;
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xe4e6e2, 2);
        fill.position.set(6, 2, -5);
        scene.add(fill);
        const group = new THREE.Group();
        scene.add(group);
        group.rotation.set(-0.17, -0.25, -0.2);
        const material = new THREE.MeshStandardMaterial({
          color: 0xbd4328,
          roughness: 0.32,
          metalness: 0.17,
        });
        const darkMaterial = new THREE.MeshStandardMaterial({
          color: 0x3a352b,
          roughness: 0.45,
          metalness: 0.18,
        });
        const geometry = new RoundedBoxGeometry(3.25, 0.52, 0.5, 3, 0.085);
        const vertical = new RoundedBoxGeometry(0.52, 2.21, 0.5, 3, 0.085);
        const layers: InstanceType<typeof THREE.Group>[] = [];
        for (let i = 0; i < 6; i++) {
          const layer = new THREE.Group();
          for (const y of [-1.35, 1.35]) {
            const mesh = new THREE.Mesh(
              geometry,
              i === 5 ? darkMaterial : material,
            );
            mesh.position.y = y;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            layer.add(mesh);
          }
          for (const x of [-1.365, 1.365]) {
            const mesh = new THREE.Mesh(
              vertical,
              i === 5 ? darkMaterial : material,
            );
            mesh.position.x = x;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            layer.add(mesh);
          }
          layer.position.z = (i - 2.5) * 0.62;
          layers.push(layer);
          group.add(layer);
        }
        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = 128;
        shadowCanvas.height = 128;
        const ctx = shadowCanvas.getContext('2d')!;
        const gradient = ctx.createRadialGradient(64, 64, 5, 64, 64, 64);
        gradient.addColorStop(0, 'rgba(45,32,22,.23)');
        gradient.addColorStop(0.5, 'rgba(45,32,22,.1)');
        gradient.addColorStop(1, 'rgba(45,32,22,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
        const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
        const planeGeometry = new THREE.PlaneGeometry(8, 7);
        const shadowMaterial = new THREE.MeshBasicMaterial({
          map: shadowTexture,
          transparent: true,
          depthWrite: false,
        });
        const plane = new THREE.Mesh(planeGeometry, shadowMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -2.5;
        scene.add(plane);
        let pointerX = 0,
          pointerY = 0;
        let state = 0,
          visible = true,
          disposed = false;
        let previous = 0,
          elapsed = 0;
        let idle = 0;
        const resize = () => {
          const { width, height } = stage.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          redraw?.();
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(stage);
        resize();
        const pointer = (e: PointerEvent) => {
          const r = stage.getBoundingClientRect();
          pointerX = (e.clientX - r.left) / r.width - 0.5;
          pointerY = (e.clientY - r.top) / r.height - 0.5;
          redraw?.();
        };
        const leave = () => {
          pointerX = 0;
          pointerY = 0;
          redraw?.();
        };
        host.addEventListener('pointermove', pointer);
        host.addEventListener('pointerleave', leave);
        const draw = (time: number) => {
          if (disposed) return;
          const dt = Math.min((time - previous) / 1000, 0.05);
          previous = time;
          if (!paused) {
            elapsed += dt;
            idle += dt;
          }
          state += (Number(assembled) - state) * Math.min(dt * 5, 1);
          const wave = paused ? 0 : Math.sin(elapsed * 0.35) * 0.045;
          group.rotation.y +=
            (-0.35 + pointerX * 0.23 + wave - group.rotation.y) * 0.045;
          group.rotation.x +=
            (-0.16 + pointerY * 0.13 - group.rotation.x) * 0.045;
          layers.forEach((layer, i) => {
            const spread = 1 - state;
            layer.position.z = (i - 2.5) * (0.5 + spread * 0.34);
            layer.position.x = Math.sin(i * 0.7) * spread * 0.24;
            layer.position.y = (i - 2.5) * spread * 0.12;
            layer.rotation.z = (i - 2.5) * spread * 0.07;
          });
          renderer.render(scene, camera);
          if (host.dataset.rendered !== 'true') host.dataset.rendered = 'true';
          if (
            paused &&
            Math.abs(Number(assembled) - state) < 0.001 &&
            Math.abs(group.rotation.y - (-0.35 + pointerX * 0.23)) < 0.001 &&
            Math.abs(group.rotation.x - (-0.16 + pointerY * 0.13)) < 0.001
          )
            renderer.setAnimationLoop(null);
          // Stop automatic movement after its introduction. Pointer / assembly remain usable.
          if (idle > 18 && !paused) {
            paused = true;
            pause.setAttribute('aria-pressed', 'true');
            pause.textContent = t.motion.resume;
            pause.setAttribute('aria-label', t.sculpture.resumeLabel);
          }
        };
        const run = () => {
          renderer.setAnimationLoop(!document.hidden && visible ? draw : null);
        };
        redraw = run;
        const visibility = new IntersectionObserver(
          (entries) => {
            visible = entries[0].isIntersecting;
            run();
          },
          { threshold: 0.05 },
        );
        visibility.observe(host);
        const visibilityChange = () => run();
        document.addEventListener('visibilitychange', visibilityChange);
        pause.hidden = false;
        pause.addEventListener('click', () => {
          paused = !paused;
          idle = 0;
          pause.setAttribute('aria-pressed', String(paused));
          pause.textContent = paused ? t.motion.resume : t.motion.pause;
          redraw?.();
          pause.setAttribute(
            'aria-label',
            paused ? t.sculpture.resumeLabel : t.sculpture.pauseLabel,
          );
        });
        const contextLost = (event: Event) => {
          event.preventDefault();
          host.dataset.rendered = 'false';
          pause.hidden = true;
          renderer.setAnimationLoop(null);
        };
        renderer.domElement.addEventListener('webglcontextlost', contextLost);
        cleanup = () => {
          disposed = true;
          renderer.setAnimationLoop(null);
          resizeObserver.disconnect();
          visibility.disconnect();
          document.removeEventListener('visibilitychange', visibilityChange);
          host.removeEventListener('pointermove', pointer);
          host.removeEventListener('pointerleave', leave);
          geometry.dispose();
          vertical.dispose();
          planeGeometry.dispose();
          material.dispose();
          darkMaterial.dispose();
          shadowMaterial.dispose();
          shadowTexture.dispose();
          renderer.dispose();
          renderer.domElement.remove();
          host.dataset.rendered = 'false';
          pause.hidden = true;
        };
        renderer.setAnimationLoop(draw);
      } catch {
        host.dataset.rendered = 'false';
        pause.hidden = true; /* The CSS sculpture remains usable if WebGL is unavailable. */
      }
    },
    { rootMargin: '100px' },
  );
  observer.observe(host);
  reduced.addEventListener('change', () => {
    if (reduced.matches) cleanup?.();
  });
  window.addEventListener(
    'pagehide',
    () => {
      observer.disconnect();
      cleanup?.();
    },
    { once: true },
  );
}
