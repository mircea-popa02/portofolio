import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate sphere positions only once using useMemo
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000);
    
    for (let i = 0; i < positions.length; i += 3) {
      const radius = 0.85;
      
      // Use rejection sampling method
      let x, y, z;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
      } while (x * x + y * y + z * z > 1);
      
      // Normalize and scale
      const length = Math.sqrt(x * x + y * y + z * z);
      if (length > 0 && isFinite(length)) {
        positions[i] = (x / length) * radius;
        positions[i + 1] = (y / length) * radius;
        positions[i + 2] = (z / length) * radius;
      } else {
        positions[i] = 0;
        positions[i + 1] = 0;
        positions[i + 2] = 0;
      }
    }
    
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      if (isFinite(time)) {
        ref.current.rotation.x = time * 0.1;
        ref.current.rotation.y = time * 0.15;
      }
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.004}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        style={{ pointerEvents: 'none' }}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
