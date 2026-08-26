"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const CYAN = "#22e0ff";
const BLUE = "#2563eb";

/* ── Core orb: a slowly morphing icosahedron ─────────────── */
function CoreOrb() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y = t * 0.16;
    mesh.current.rotation.x = Math.sin(t * 0.22) * 0.16;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.15, 24]} />
      <MeshDistortMaterial
        color="#0a2f5c"
        emissive="#0e5f8a"
        emissiveIntensity={0.22}
        roughness={0.12}
        metalness={0.55}
        clearcoat={1}
        clearcoatRoughness={0.08}
        distort={0.34}
        speed={1.4}
      />
    </mesh>
  );
}

/* ── Glowing wireframe shell around the core ─────────────── */
function Shell() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y = -t * 0.11;
    mesh.current.rotation.z = t * 0.07;
    const s = 1 + Math.sin(t * 0.9) * 0.022;
    mesh.current.scale.setScalar(s);
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[2.0, 1]} />
      <meshBasicMaterial
        color={CYAN}
        wireframe
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ── Orbiting rings ──────────────────────────────────────── */
function Rings() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.x = Math.PI / 3.1 + Math.sin(t * 0.3) * 0.1;
    group.current.rotation.z = t * 0.2;
  });

  return (
    <group ref={group}>
      {[2.5, 3.05, 3.6].map((r, i) => (
        <mesh key={r} rotation={[0, 0, (i * Math.PI) / 5]}>
          <torusGeometry args={[r, 0.008, 12, 160]} />
          <meshBasicMaterial
            color={i === 1 ? BLUE : CYAN}
            transparent
            opacity={0.5 - i * 0.11}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Small satellites travelling the orbits ──────────────── */
function Satellites() {
  const group = useRef<THREE.Group>(null);
  const bodies = useMemo(
    () => [
      { r: 2.5, speed: 0.55, size: 0.052, phase: 0, color: CYAN },
      { r: 3.05, speed: -0.4, size: 0.04, phase: 2.1, color: "#8ab4ff" },
      { r: 3.6, speed: 0.3, size: 0.03, phase: 4.3, color: CYAN },
    ],
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const b = bodies[i];
      const a = t * b.speed + b.phase;
      child.position.set(Math.cos(a) * b.r, Math.sin(a) * b.r * 0.34, Math.sin(a) * b.r * 0.5);
    });
    group.current.rotation.x = Math.PI / 7;
  });

  return (
    <group ref={group}>
      {bodies.map((b, i) => (
        <mesh key={i}>
          <sphereGeometry args={[b.size, 16, 16]} />
          <meshBasicMaterial color={b.color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Deep star / particle field ──────────────────────────── */
function Particles({ count = 900 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    // Deterministic PRNG: same star field on the server and the client,
    // and no impure Math.random() call during render.
    let seed = 0x5eed1;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 0x100000000;
    };

    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 5 + rand() * 9;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.024;
    points.current.rotation.x = Math.sin(t * 0.1) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={CYAN}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Pointer-driven camera parallax ──────────────────────── */
function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Mutating the three.js camera each frame is the intended r3f pattern —
    // it lives outside React's render cycle.
    const pos = camera.position;
    pos.x += (pointer.x * 1.1 - pos.x) * 0.045;
    pos.y += (pointer.y * 0.65 - pos.y) * 0.045;
    camera.lookAt(target.current);
  });

  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.18} />
      {/* key */}
      <pointLight position={[4, 4, 4]} intensity={120} color={CYAN} distance={22} />
      {/* fill */}
      <pointLight position={[-5, -2, 3]} intensity={70} color={BLUE} distance={22} />
      {/* rim from behind, gives the orb a lit edge */}
      <pointLight position={[-1.5, 1, -5]} intensity={160} color="#7fefff" distance={18} />
      <spotLight
        position={[0, 6, 3]}
        angle={0.6}
        penumbra={1}
        intensity={90}
        color="#ffffff"
        distance={20}
      />

      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.7}>
        <CoreOrb />
        <Shell />
      </Float>

      <Rings />
      <Satellites />
      <Particles />
      <CameraRig />
      <fog attach="fog" args={["#04060d", 9, 20]} />
    </Canvas>
  );
}
