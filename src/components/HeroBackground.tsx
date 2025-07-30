import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random points for the sphere
  const sphere = new Float32Array(5000);
  for (let i = 0; i < sphere.length; i += 3) {
    const radius = 0.85;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    
    sphere[i] = radius * Math.sin(phi) * Math.cos(theta);
    sphere[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    sphere[i + 2] = radius * Math.cos(phi);
  }

  useFrame(({ clock, mouse }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.1;
      ref.current.rotation.y = clock.getElapsedTime() * 0.15;
      
      // Mouse interaction
      ref.current.rotation.x += mouse.y * 0.1;
      ref.current.rotation.y += mouse.x * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.004}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
