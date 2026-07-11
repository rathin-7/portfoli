import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function Globe() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.5}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.15} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.52, 32, 32]} />
        <MeshDistortMaterial color="#06b6d4" transparent opacity={0.08} distort={0.1} speed={1} />
      </mesh>
    </Float>
  );
}

export default function AboutScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 60 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#8b5cf6" />
      <Globe />
    </Canvas>
  );
}
