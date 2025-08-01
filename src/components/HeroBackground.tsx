import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from './theme-provider';

function AnimatedSphere() {
  const ref = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const { viewport, mouse } = useThree();

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

  useFrame(({ clock }) => {
    if (ref.current && ref.current.geometry) {
      const time = clock.getElapsedTime() * 0.5;
      const positionsAttribute = ref.current.geometry.attributes.position as THREE.BufferAttribute;

      const mouse3D = new THREE.Vector3(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      );

      for (let i = 0; i < positionsAttribute.count; i++) {
        const x = originalPositions[i * 3];
        const y = originalPositions[i * 3 + 1];
        const z = originalPositions[i * 3 + 2];

        const particlePos = new THREE.Vector3(x, y, z);
        const distance = particlePos.distanceTo(mouse3D);
        const repulsion = Math.max(0, 1.0 - distance) * 0.5;

        const dir = new THREE.Vector3().subVectors(particlePos, mouse3D).normalize();
        
        positionsAttribute.setX(i, x + dir.x * repulsion + Math.sin(time + i * 0.01) * randomFactors[i * 3]);
        positionsAttribute.setY(i, y + dir.y * repulsion + Math.cos(time + i * 0.01) * randomFactors[i * 3 + 1]);
        positionsAttribute.setZ(i, z + dir.z * repulsion + Math.sin(time + i * 0.01) * randomFactors[i * 3 + 2]);
      }

      positionsAttribute.needsUpdate = true;
      ref.current.rotation.y += 0.0002;
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
    <div className="absolute inset-0 -z-10">
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
      >
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
