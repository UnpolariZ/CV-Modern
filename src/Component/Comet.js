import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function CometScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer;
    const comets = [];
    const cometGroup = new THREE.Group();

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const logoUrls = [
      `${process.env.PUBLIC_URL}/Assets/images/htmlcssjs.png`,
      `${process.env.PUBLIC_URL}/Assets/images/scss.png`,
      `${process.env.PUBLIC_URL}/Assets/images/git.png`,
      `${process.env.PUBLIC_URL}/Assets/images/adobexd.png`,
      `${process.env.PUBLIC_URL}/Assets/images/photoshop.png`,
      `${process.env.PUBLIC_URL}/Assets/images/sonarqube-logo.png`,
      `${process.env.PUBLIC_URL}/Assets/images/copilote.png`,
      `${process.env.PUBLIC_URL}/Assets/images/docker.png`,
      `${process.env.PUBLIC_URL}/Assets/images/ts.png`,
      `${process.env.PUBLIC_URL}/Assets/images/vscode.png`,
      `${process.env.PUBLIC_URL}/Assets/images/intellij.png`,
      `${process.env.PUBLIC_URL}/Assets/images/blender.png`,
      `${process.env.PUBLIC_URL}/Assets/images/css.webp`,
      `${process.env.PUBLIC_URL}/Assets/images/appium.webp`,
      `${process.env.PUBLIC_URL}/Assets/images/python.webp`,
      `${process.env.PUBLIC_URL}/Assets/images/postman.webp`,
      `${process.env.PUBLIC_URL}/Assets/images/gsap.svg`,
      `${process.env.PUBLIC_URL}/Assets/images/html.png`,
      `${process.env.PUBLIC_URL}/Assets/images/figma-logo.png`,
      `${process.env.PUBLIC_URL}/Assets/images/aem.png`,
      `${process.env.PUBLIC_URL}/Assets/images/threejs.png`,
      `${process.env.PUBLIC_URL}/Assets/images/sql.png`,
      `${process.env.PUBLIC_URL}/Assets/images/azure.png`,
      `${process.env.PUBLIC_URL}/Assets/images/react.svg`,
      `${process.env.PUBLIC_URL}/Assets/images/js.png`,
      `${process.env.PUBLIC_URL}/Assets/images/jquery.png`,
      `${process.env.PUBLIC_URL}/Assets/images/mongodb.png`,
      `${process.env.PUBLIC_URL}/Assets/images/playwright.webp`,
      `${process.env.PUBLIC_URL}/Assets/images/cypress.svg`,
      `${process.env.PUBLIC_URL}/Assets/images/github.png`,
      `${process.env.PUBLIC_URL}/Assets/images/gitlab.svg`,
      `${process.env.PUBLIC_URL}/Assets/images/jira-1.svg`,
    ];

    const cometCount = logoUrls.length;
    const initialPositions = [];

    const fadeStates = logoUrls.map((_, i) => ({
      state: 'waiting', 
      startTime: performance.now() + i * 1000,
      duration: 1250, 
      visibleDuration: 6000 + Math.random() * 4000,
    }));

    const init = () => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
      );
      camera.position.z = 1000;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      scene.add(cometGroup);

      const loader = new THREE.TextureLoader();

      for (let i = 0; i < cometCount; i++) {
        const texture = loader.load(logoUrls[i % logoUrls.length]);
        const material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0,
          blending: THREE.NormalBlending,
          depthWrite: false,
          depthTest: false,
        });

        const sprite = new THREE.Sprite(material);
        sprite.scale.set(60, 60, 1);

        const pos = generateNonOverlappingPosition(initialPositions, 250);
        sprite.position.copy(pos);
        initialPositions.push(pos.clone());

        cometGroup.add(sprite);
        comets.push(sprite);
      }

      window.addEventListener('resize', onWindowResize);
      window.addEventListener('mousemove', onMouseMove);
    };

    const generateNonOverlappingPosition = (existingPositions, minDistance) => {
      let attempts = 0;
      while (attempts < 1000) {
        const pos = generateSphericalPosition();
        const tooClose = existingPositions.some(
          (p) => p.distanceTo(pos) < minDistance
        );
        if (!tooClose) return pos;
        attempts++;
      }
      return generateSphericalPosition();
    };

    const generateSphericalPosition = () => {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(THREE.MathUtils.randFloat(-0.6, 0.6));
      const radius = 900 + Math.random() * 200;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi) + 200;

      return new THREE.Vector3(x, y, z);
    };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const smoothStep = (t) => t * t * (3 - 2 * t);

    const animate = () => {
      requestAnimationFrame(animate);

      const time = performance.now();

      const visibleCount = fadeStates.filter(
        (f) => f.state === 'visible' || f.state === 'fadingIn'
      ).length;

      comets.forEach((comet, i) => {
        const initPos = initialPositions[i];

        // Oscillation
        comet.position.x = initPos.x + Math.sin(time * 0.001 + i) * 5;
        comet.position.y = initPos.y + Math.cos(time * 0.0008 + i * 1.1) * 5;
        comet.position.z = initPos.z + Math.sin(time * 0.0012 + i * 1.3) * 5;

        // Fade logic
        const fade = fadeStates[i];

        if (fade.state === 'waiting' && time >= fade.startTime) {
          if (visibleCount < 10) {
            fade.state = 'fadingIn';
            fade.startTime = time;
          } else {
            // Si 6 visibles, on attend un peu avant de retenter
            fade.startTime = time + 1000 + Math.random() * 2000;
          }
        }

        if (fade.state === 'fadingIn') {
          const progress = (time - fade.startTime) / fade.duration;
          if (progress >= 1) {
            comet.material.opacity = 0.4;
            fade.state = 'visible';
            fade.startTime = time;
          } else {
            comet.material.opacity = smoothStep(progress) * 0.4;
          }
        }

        if (fade.state === 'visible') {
          if (time - fade.startTime >= fade.visibleDuration) {
            fade.state = 'fadingOut';
            fade.startTime = time;
          }
        }

        if (fade.state === 'fadingOut') {
          const progress = (time - fade.startTime) / fade.duration;
          if (progress >= 1) {
            comet.material.opacity = 0;
            fade.state = 'waiting';
            fade.startTime = time + 3000 + Math.random() * 4000;
          } else {
            comet.material.opacity = (1 - smoothStep(progress)) * 0.4;
          }
        }
      });

      // Rotation fluide
      target.x += (mouse.x - target.x) * 0.05;
      target.y += (mouse.y - target.y) * 0.05;

      cometGroup.rotation.y = target.x * 0.5;
      cometGroup.rotation.x = clamp(target.y * 0.3, -0.4, 0.4);

      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (renderer) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '0vw',
        height: '0vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
