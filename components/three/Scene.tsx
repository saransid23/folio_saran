"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;

    // React to mouse
    const mouseX = (state.pointer.x * Math.PI) / 6;
    const mouseY = (state.pointer.y * Math.PI) / 6;
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      mouseX * 0.2,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouseY * 0.2 + state.clock.elapsedTime * 0.15,
      0.05
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshDistortMaterial
          color="#D9FF3F"
          emissive="#D9FF3F"
          emissiveIntensity={0.2}
          wireframe
          distort={0.2}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#D9FF3F" />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
