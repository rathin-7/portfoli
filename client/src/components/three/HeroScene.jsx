import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';

function Galaxy() {
  const ref = useRef();
  const count = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 5;
      const spinAngle = radius * 2;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;
      const randomX = (Math.random() - 0.5) * 0.5;
      const randomY = (Math.random() - 0.5) * 0.2;
      const randomZ = (Math.random() - 0.5) * 0.5;
      pos[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i * 3 + 1] = randomY;
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
    }
    return pos;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.015} color="#8b5cf6" transparent opacity={0.8} sizeAttenuation />
      </points>
    </group>
  );
}

function FloatingObjects() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 1, -2]}>
          <octahedronGeometry args={[0.5, 0]} />
          <MeshDistortMaterial color="#8b5cf6" transparent opacity={0.6} distort={0.3} speed={2} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[3, -1, -3]}>
          <dodecahedronGeometry args={[0.4, 0]} />
          <MeshWobbleMaterial color="#06b6d4" transparent opacity={0.5} factor={0.5} speed={2} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[2, 2, -4]}>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#a78bfa" wireframe transparent opacity={0.4} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-2, -2, -2]}>
          <torusGeometry args={[0.4, 0.15, 16, 32]} />
          <meshStandardMaterial color="#22d3ee" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={3}>
        <mesh position={[0, -1, -5]}>
          <torusKnotGeometry args={[0.3, 0.1, 64, 8]} />
          <MeshDistortMaterial color="#c084fc" transparent opacity={0.4} distort={0.2} speed={1.5} />
        </mesh>
      </Float>
    </>
  );
}

function Particles() {
  const ref = useRef();
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    ref.current.rotation.x = state.clock.elapsedTime * 0.005;
  });

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
      </points>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} style={{ position: 'absolute', inset: 0 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
      <Galaxy />
      <FloatingObjects />
      <Particles />
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  );
}
