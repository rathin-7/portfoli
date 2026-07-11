import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function ContactOrb() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={2} floatIntensity={2}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
        <MeshDistortMaterial color="#8b5cf6" transparent opacity={0.3} distort={0.3} speed={2} />
      </mesh>
    </Float>
  );
}

export default function ContactScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 60 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#06b6d4" />
      <ContactOrb />
    </Canvas>
  );
}
