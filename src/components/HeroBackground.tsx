import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const ref = useRef<THREE.Points>(null);
  
  // Alternative approach: use Fibonacci sphere distribution for more reliable results
  const generateFibonacciSphere = (numPoints: number, radius: number): Float32Array => {
    const positions = new Float32Array(numPoints * 3);
    const goldenAngle = Math.PI * (3.0 - Math.sqrt(5.0)); // Golden angle in radians
    
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      
      const theta = goldenAngle * i;
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      // Scale by radius and validate
      const scaledX = radius * x;
      const scaledY = radius * y;
      const scaledZ = radius * z;
      
      positions[i * 3] = isFinite(scaledX) ? scaledX : 0;
      positions[i * 3 + 1] = isFinite(scaledY) ? scaledY : 0;
      positions[i * 3 + 2] = isFinite(scaledZ) ? scaledZ : 0;
    }
    
    return positions;
  };
  
  const sphere = generateFibonacciSphere(1667, 0.85); // 1667 points for 5000 array length

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
