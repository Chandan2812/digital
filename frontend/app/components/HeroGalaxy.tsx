"use client";

import { Float, Line, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

function GalaxyCore() {
  const group = useRef<Group>(null);
  const points = useMemo(
    () =>
      [
        [-2.15, -0.85, 0],
        [-1.05, 0.88, 0.1],
        [0.2, -0.16, 0.25],
        [1.28, 0.82, -0.1],
        [2.2, -0.66, 0.15],
      ] as [number, number, number][],
    [],
  );

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.rotation.y = time * 0.12 + pointer.x * 0.22;
    group.current.rotation.x = pointer.y * 0.14;
  });

  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.45} floatIntensity={0.8}>
        <Line
          points={points}
          color="#65bc4f"
          lineWidth={2}
          transparent
          opacity={0.86}
        />
        {points.map((point, index) => (
          <mesh key={`${point.join("-")}-${index}`} position={point}>
            <sphereGeometry args={[index === 2 ? 0.2 : 0.12, 32, 32]} />
            <meshStandardMaterial
              color={index % 2 ? "#ef3346" : "#65bc4f"}
              emissive={index % 2 ? "#ef3346" : "#00ff88"}
              emissiveIntensity={1.15}
              metalness={0.55}
              roughness={0.18}
            />
          </mesh>
        ))}
        <mesh rotation={[1.08, 0.2, 0.36]}>
          <torusGeometry args={[1.26, 0.018, 16, 150]} />
          <meshStandardMaterial
            color="#155b9e"
            emissive="#155b9e"
            emissiveIntensity={1.3}
          />
        </mesh>
        <mesh rotation={[0.36, -0.8, 0.1]}>
          <torusGeometry args={[1.72, 0.01, 16, 150]} />
          <meshStandardMaterial
            color="#65bc4f"
            emissive="#00ff88"
            emissiveIntensity={0.85}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroGalaxy() {
  return (
    <Canvas camera={{ position: [0, 0, 5.4], fov: 44 }} dpr={[1, 1.6]}>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.42} />
      <pointLight color="#65bc4f" intensity={12} position={[3, 2, 4]} />
      <pointLight color="#ef3346" intensity={10} position={[-3, -1, 3]} />
      <pointLight color="#155b9e" intensity={12} position={[0, 4, 3]} />
      <Stars count={760} depth={42} factor={3.5} fade speed={0.45} />
      <GalaxyCore />
    </Canvas>
  );
}
