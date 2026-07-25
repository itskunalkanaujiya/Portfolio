"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function AnimatedBlob() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { mouse } = state;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.y * 0.3,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.x * 0.3,
      0.05
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={meshRef} args={[1.6, 8]}>
        <MeshDistortMaterial
          color="#7C3AED"
          attach="material"
          distort={0.45}
          speed={2}
          roughness={0.15}
          metalness={0.6}
          emissive="#00E5FF"
          emissiveIntensity={0.15}
        />
      </Icosahedron>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#00E5FF" />
          <pointLight position={[-5, -5, -5]} intensity={0.8} color="#7C3AED" />
          <AnimatedBlob />
        </Suspense>
      </Canvas>
    </div>
  );
}
