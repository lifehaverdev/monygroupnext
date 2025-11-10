"use client";
import React, { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface RoomProps {
  /** Path to images relative to public root */
  images: {
    frontLeft: string;
    frontRight: string;
    backLeft: string;
    backRight: string;
  };
  depthStretch?: number; // multiplier for hallway depth
}

// Simple low-poly PSX-style cube room: floor, 3 walls + ceiling (5 planes)
// and four framed images textured onto portions of the front & back walls.
// Note: ThreeScene handles fallback to home images for unknown pages,
// so images passed here should always be valid paths.
export default function Room({ images, depthStretch = 1 }: RoomProps) {
  // Load textures - useTexture will suspend until loaded
  // If images fail to load, Suspense boundary in ThreeScene will handle it
  const [frontLeftTx, frontRightTx, backLeftTx, backRightTx] = useTexture([
    images.frontLeft,
    images.frontRight,
    images.backLeft,
    images.backRight,
  ]);

  // Memoise shared plane geometry to stay well under 2k vertices.
  const artPlane = useMemo(() => new THREE.PlaneGeometry(0.6, 0.6), []);

  // Helper to create framed image plane
  const Framed = (props: { tex: THREE.Texture; position: [number, number, number]; rotation: [number, number, number]; }) => (
    <group position={props.position} rotation={props.rotation}>
      {/* frame */}
      <mesh geometry={artPlane} dispose={null}>
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* image inset */}
      <mesh position={[0, 0, 0.01]} geometry={artPlane} dispose={null}>
        <meshBasicMaterial map={props.tex} toneMapped={false} />
      </mesh>
    </group>
  );

  return (
    <group dispose={null}>
      {/* Framed images on side walls (closer = +Z, further = -Z) */}
      {/* Left wall (-X) */}
      <Framed tex={frontLeftTx} position={[-1.99, 0, 1.2]} rotation={[0, Math.PI / 2, 0]} />
      <Framed tex={backLeftTx}  position={[-1.99, 0, -1.2 * depthStretch]} rotation={[0, Math.PI / 2, 0]} />
      {/* Right wall (+X) */}
      <Framed tex={frontRightTx} position={[1.99, 0, 1.2]} rotation={[0, -Math.PI / 2, 0]} />
      <Framed tex={backRightTx} position={[1.99, 0, -1.2 * depthStretch]} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
}
