"use client";

import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function BrandCore() {
  const core = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime();

    if (core.current) {
      core.current.rotation.x = time * 0.28 + pointer.y * 0.45;
      core.current.rotation.y = time * 0.42 + pointer.x * 0.55;
    }

    if (ring.current) {
      ring.current.rotation.x = time * 0.18;
      ring.current.rotation.z = time * -0.24;
    }
  });

  return (
    <group>
      <Float speed={2.4} rotationIntensity={0.65} floatIntensity={0.9}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.65, 5]} />
          <MeshDistortMaterial
            color="#155b9e"
            distort={0.45}
            emissive="#0f6bb3"
            emissiveIntensity={0.45}
            metalness={0.72}
            roughness={0.18}
            speed={2.2}
          />
        </mesh>
      </Float>

      <mesh ref={ring} rotation={[1.1, 0.3, 0]}>
        <torusGeometry args={[2.34, 0.024, 16, 160]} />
        <meshStandardMaterial color="#ef3346" emissive="#ef3346" emissiveIntensity={1.2} />
      </mesh>

      <mesh rotation={[0.4, -0.7, 0.2]}>
        <torusGeometry args={[2.9, 0.012, 16, 160]} />
        <meshStandardMaterial color="#65bc4f" emissive="#00ff88" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

export default function BigwigWebGL() {
  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }} dpr={[1, 1.8]}>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.35} />
      <pointLight color="#ef3346" intensity={18} position={[-3, 2.5, 4]} />
      <pointLight color="#65bc4f" intensity={12} position={[3.4, -1.4, 3.2]} />
      <pointLight color="#155b9e" intensity={14} position={[0, 4, 4]} />
      <Stars count={900} depth={45} factor={3.8} fade speed={0.6} />
      <BrandCore />
    </Canvas>
  );
}
