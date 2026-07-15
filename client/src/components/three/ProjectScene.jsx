import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function FloatingLaptop() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });
  return (
    <Float speed={1} floatIntensity={0.5}>
      <group ref={ref}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.6, 0.05, 1]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.5, -0.5]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[1.6, 0.9, 0.02]} />
          <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.5, -0.48]} rotation={[-0.3, 0, 0]}>
          <planeGeometry args={[1.4, 0.7]} />
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.3} emissive="#06b6d4" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

function CodeParticles() {
  const ref = useRef();
  const count = 50;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#8b5cf6" transparent opacity={0.6} sizeAttenuation />
      </points>
    </group>
  );
}

export default function ProjectScene() {
  return (
    <Canvas camera={{ position: [0, 1, 4], fov: 60 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#06b6d4" />
      <FloatingLaptop />
      <CodeParticles />
    </Canvas>
  );
}
