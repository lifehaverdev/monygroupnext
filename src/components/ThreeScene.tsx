"use client";
import React, { Suspense, useEffect, useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Room from './Room';
import { useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { useReadiness } from '../contexts/ReadinessContext';

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

interface ThreeSceneProps {
  images?: { frontLeft: string; frontRight: string; backLeft: string; backRight: string };
}

export default function ThreeScene({ images: customImages }: ThreeSceneProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const { setSceneProgress } = useReadiness();
  const pathname = usePathname();

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mqMotion.matches);
    const motionHandler = () => setPrefersReduced(mqMotion.matches);
    mqMotion.addEventListener('change', motionHandler);
    return () => {
      mqMotion.removeEventListener('change', motionHandler);
    };
  }, []);

  // Auto-detect page slug from pathname
  const getPageSlug = () => {
    if (!pathname) return 'home';
    // Extract slug from pathname: '/' -> 'home', '/about' -> 'about', etc.
    const slug = pathname === '/' ? 'home' : pathname.slice(1);
    return slug;
  };

  const pageSlug = getPageSlug();
  const basePath = `/images/displays/${pageSlug}`;

  // Construct image paths based on page slug, fallback to home
  const defaultImages = {
    frontLeft: `${basePath}/1.jpeg`,
    backLeft: `${basePath}/2.jpeg`,
    backRight: `${basePath}/3.jpeg`,
    frontRight: `${basePath}/4.jpeg`,
  } as const;

  const images = customImages ?? defaultImages;

  // Track scene loading progress
  useEffect(() => {
    setSceneProgress(20); // Scene component mounted, Canvas initializing
  }, [setSceneProgress]);

  // Update progress when Canvas is created
  useEffect(() => {
    const canvasReadyTimeout = setTimeout(() => {
      setSceneProgress(40); // Canvas created
    }, 100);

    return () => clearTimeout(canvasReadyTimeout);
  }, []);

  // Fallback: if scene never loads, signal ready after timeout
  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      setSceneProgress(100); // Allow splash to dismiss even if scene fails
    }, 5000);

    return () => clearTimeout(fallbackTimeout);
  }, [setSceneProgress]);

  return (
    <Canvas 
      dpr={[1, 1.5]} 
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 5]} intensity={1} />
      <Suspense fallback={null}>
        <SceneContent 
          images={images} 
          paused={prefersReduced} 
          onProgress={(progress) => setSceneProgress(progress)}
          onReady={() => setSceneProgress(100)} 
        />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate={false} />
    </Canvas>
  );
}

function SceneContent({ images, paused, onProgress, onReady }: { images: { frontLeft: string; frontRight: string; backLeft: string; backRight: string }; paused: boolean; onProgress?: (progress: number) => void; onReady: () => void }) {
  const { viewport, camera } = useThree();
  const perspCam = camera as THREE.PerspectiveCamera;
  const baseWidth = 4; // native room width units
  const scaleX = viewport.width < baseWidth ? viewport.width / baseWidth : 1;
  const readyRef = React.useRef(false);

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

  // Signal readiness once scene content is mounted and rendered
  // Since SceneContent only mounts after Suspense resolves (textures loaded),
  // we can signal readiness after first render
  useEffect(() => {
    if (readyRef.current) return;
    
    // SceneContent mounted means textures are loaded (Suspense resolved)
    if (onProgress) onProgress(60); // Textures loaded, scene rendering
    
    // Wait for two frames to ensure everything is rendered, then mark complete
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!readyRef.current) {
          readyRef.current = true;
          onReady(); // Final call to mark as 100%
        }
      });
    });
  }, [onReady, onProgress]);

  return (
    <group scale={roomScale}>
      <Room images={images} depthStretch={depthStretch} />
      <Diamond paused={paused} />
    </group>
  );
}
