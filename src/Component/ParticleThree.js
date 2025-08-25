import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ParticleScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, particleSystem;
    let mouse = { x: 0, y: 0 };

    let geometry;
    let positions, initialPositions;
    const particlesCount = 300;

    const init = () => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 200;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      geometry = new THREE.BufferGeometry();
      positions = new Float32Array(particlesCount * 3);
      initialPositions = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 100 + Math.random() * 3500;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        positions.set([x, y, z], i * 3);
        initialPositions.set([x, y, z], i * 3);
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const textureLoader = new THREE.TextureLoader();
      const particleTexture = textureLoader.load(
        'https://threejs.org/examples/textures/sprites/circle.png'
      );

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 5,
        transparent: true,
        opacity: 0.7,
        map: particleTexture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      particleSystem = new THREE.Points(geometry, material);
      scene.add(particleSystem);

      document.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onWindowResize);
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

    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // ➕ Mouvement doux des particules
      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3;

        positions[ix] =
          initialPositions[ix] + Math.sin(time + i) * 0.5;
        positions[ix + 1] =
          initialPositions[ix + 1] + Math.cos(time * 0.8 + i * 1.1) * 0.5;
        positions[ix + 2] =
          initialPositions[ix + 2] + Math.sin(time * 1.2 + i * 1.3) * 0.5;
      }
      geometry.attributes.position.needsUpdate = true;

      // ➕ Rotation en fonction de la souris
      const targetX = mouse.x * 0.5;
      const targetY = -mouse.y * 0.5;

      particleSystem.rotation.y +=
        0.002 + (targetX - particleSystem.rotation.y) * 0.05;
      particleSystem.rotation.x += (targetY - particleSystem.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '0vw', height: '0vh' }} />;
}
