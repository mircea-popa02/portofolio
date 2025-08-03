import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from './theme-provider';

function AnimatedSphere() {
  const ref = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const { mouse } = useThree();

  const particleColor = useMemo(() => {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    return isDark ? '#ffffff' : '#333333';
  }, [theme]);

  const { positions, randomFactors, originalPositions } = useMemo(() => {
    const numPoints = 5000;
    const positions = new Float32Array(numPoints * 3);
    const randomFactors = new Float32Array(numPoints * 3);
    const radius = 1.2;

    for (let i = 0; i < numPoints; i++) {
      const r = radius + (Math.random() - 0.5) * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      randomFactors[i * 3] = (Math.random() - 0.5) * 0.005;
      randomFactors[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      randomFactors[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return { positions, randomFactors, originalPositions: new Float32Array(positions) };
  }, []);

  useFrame(({ clock }, delta) => {
    if (ref.current && ref.current.geometry) {
      const time = clock.getElapsedTime() * 0.3;
      const positionsAttribute = ref.current.geometry.attributes.position as THREE.BufferAttribute;

      // Convert mouse coordinates to 3D space with better scaling
      const mouse3D = new THREE.Vector3(
        mouse.x * 2,
        mouse.y * 2,
        0
      );

      for (let i = 0; i < positionsAttribute.count; i++) {
        const x = originalPositions[i * 3];
        const y = originalPositions[i * 3 + 1];
        const z = originalPositions[i * 3 + 2];

        const particlePos = new THREE.Vector3(x, y, z);
        const distance = particlePos.distanceTo(mouse3D);
        
        // Enhanced interaction with smoother falloff
        const maxDistance = 1.5;
        const influence = Math.max(0, 1 - (distance / maxDistance));
        const repulsion = influence * influence * 0.3; // Quadratic falloff for smoother interaction

        const dir = new THREE.Vector3().subVectors(particlePos, mouse3D);
        if (dir.length() > 0) {
          dir.normalize();
        }
        
        // Add subtle floating animation
        const floatX = Math.sin(time + i * 0.01) * randomFactors[i * 3] * 2;
        const floatY = Math.cos(time + i * 0.015) * randomFactors[i * 3 + 1] * 2;
        const floatZ = Math.sin(time * 0.8 + i * 0.008) * randomFactors[i * 3 + 2] * 2;
        
        positionsAttribute.setX(i, x + dir.x * repulsion + floatX);
        positionsAttribute.setY(i, y + dir.y * repulsion + floatY);
        positionsAttribute.setZ(i, z + dir.z * repulsion + floatZ);
      }

      positionsAttribute.needsUpdate = true;
      ref.current.rotation.y += 0.03  * delta;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={particleColor}
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10" style={{ pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 2.5] }}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ pointerEvents: 'auto' }}
      >
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
