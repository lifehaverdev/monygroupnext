import React, { Suspense, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Room from './Room';
import { useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';

function Diamond({ paused }: { paused: boolean }) {
  const ref = React.useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (paused) return;
    ref.current.rotation.z = Math.PI / 4; // always tilted 45°
    ref.current.rotation.y = clock.getElapsedTime() * 0.5; // gentle spin
  });
  return (
    <mesh ref={ref} rotation={[0, 0, Math.PI / 4]}>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color="#7DD3FC" flatShading />
    </mesh>
  );
}

export default function ThreeScene() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mqMotion.matches);
    const motionHandler = () => setPrefersReduced(mqMotion.matches);
    mqMotion.addEventListener('change', motionHandler);
    return () => {
      mqMotion.removeEventListener('change', motionHandler);
    };
  }, []);

  const images = {
    frontLeft: '/images/displays/miladystation.png',
    frontRight: '/images/displays/cultexecutive.jpg',
    backLeft: '/images/displays/cigstation.png',
    backRight: '/images/displays/tubbystation.png',
  } as const;

  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 5]} intensity={1} />
      <Suspense fallback={null}>
        <SceneContent images={images} paused={prefersReduced} />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate={false} />
    </Canvas>
  );
}

function SceneContent({ images, paused }: { images: { frontLeft: string; frontRight: string; backLeft: string; backRight: string }; paused: boolean }) {
  const { viewport, camera } = useThree();
  const perspCam = camera as THREE.PerspectiveCamera;
  const baseWidth = 4; // native room width units
  const scaleX = viewport.width < baseWidth ? viewport.width / baseWidth : 1;

  // Memoise vector to avoid re-creating array each frame
  const roomScale = useMemo<[number, number, number]>(() => [scaleX, 1, 1], [scaleX]);
  const depthStretch = 1 + (1 - scaleX) * 1.5; // makes hallway deeper on mobile

  // Adjust camera when scale changes (gives deeper corridor feel)
  useEffect(() => {
    if (scaleX < 1) {
      perspCam.position.z = 4 + (1 - scaleX) * 2; // pull back slightly
      perspCam.fov = 65 + (1 - scaleX) * 15;      // widen field of view
    } else {
      perspCam.position.z = 6;
      perspCam.fov = 50;
    }
    perspCam.updateProjectionMatrix();
  }, [scaleX, perspCam]);

  return (
    <group scale={roomScale}>
      <Room images={images} depthStretch={depthStretch} />
      <Diamond paused={paused} />
    </group>
  );
}
