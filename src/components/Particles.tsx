import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ParticlesProps {
  count?: number;
  paused?: boolean;
}

export default function Particles({ count = 150, paused = false }: ParticlesProps) {
  // Memoise positions only once
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // random points inside a 6×6×6 cube
      arr[i * 3 + 0] = THREE.MathUtils.randFloatSpread(6);
      arr[i * 3 + 1] = THREE.MathUtils.randFloatSpread(6);
      arr[i * 3 + 2] = THREE.MathUtils.randFloatSpread(6);
    }
    return arr;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.03,
    color: '#7dd3fc',
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
  }), []);

  const ref = React.useRef<THREE.Points>(null!);

  useFrame(({ clock }) => {
    if (paused || !ref.current) return;
    const rot = clock.elapsedTime * 0.02;
    ref.current.rotation.set(rot, rot, rot);
  });

  return <points ref={ref} geometry={geometry} material={material} dispose={null} />;
}
