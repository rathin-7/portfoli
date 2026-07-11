import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function SkillOrb({ position, color, speed }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * speed;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
  });
  return (
    <Float speed={2} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.3, 1]} />
        <MeshDistortMaterial color={color} transparent opacity={0.6} distort={0.2} speed={2} />
      </mesh>
    </Float>
  );
}

export default function SkillsScene() {
  const orbs = [
    { position: [-2, 1, 0], color: '#61DAFB', speed: 0.3 },
    { position: [2, -1, -1], color: '#339933', speed: 0.4 },
    { position: [0, 2, -2], color: '#F7DF1E', speed: 0.2 },
    { position: [-1, -2, -1], color: '#06B6D4', speed: 0.35 },
    { position: [1, 0, -3], color: '#8b5cf6', speed: 0.25 },
  ];

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#8b5cf6" />
      {orbs.map((orb, i) => (
        <SkillOrb key={i} {...orb} />
      ))}
    </Canvas>
  );
}
