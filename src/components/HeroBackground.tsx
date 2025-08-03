import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from './theme-provider';


function AnimatedSphere({ mouse3D, particleSize }: { mouse3D: THREE.Vector3; particleSize: number }) {
  const ref = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const rotationRef = useRef(0); // Track current rotation

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

      // Update rotation tracking
      rotationRef.current += 0.03 * delta;
      
      // Apply inverse rotation to mouse position to account for sphere rotation
      const rotatedMouse3D = mouse3D.clone();
      rotatedMouse3D.applyAxisAngle(new THREE.Vector3(0, 1, 0), -rotationRef.current);

      for (let i = 0; i < positionsAttribute.count; i++) {
        const x = originalPositions[i * 3];
        const y = originalPositions[i * 3 + 1];
        const z = originalPositions[i * 3 + 2];

        const particlePos = new THREE.Vector3(x, y, z);
        const distance = particlePos.distanceTo(rotatedMouse3D);
        
        // Enhanced interaction with smoother falloff
        const maxDistance = 1.0; // Reduced for more localized interaction
        const influence = Math.max(0, 1 - (distance / maxDistance));
        const repulsion = influence * influence * 0.4; // Slightly increased strength

        const dir = new THREE.Vector3().subVectors(particlePos, rotatedMouse3D);
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
      ref.current.rotation.y = rotationRef.current;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={particleColor}
        size={particleSize}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}


export function HeroBackground() {
  const [mouse3D, setMouse3D] = useState(new THREE.Vector3(0, 0, 0));
  const [particleSize, setParticleSize] = useState(0.001);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateParticleSize = () => {
      if (!containerRef.current) return;
      
      // Calculate particle size based on screen dimensions
      const width = window.innerWidth;
      const height = window.innerHeight;
      const diagonal = Math.sqrt(width * width + height * height);
      
      // Base size calculation - scale with screen diagonal
      // Adjust the multiplier to fine-tune the size
      const baseSize = 0.002; // Minimum size
      const scaleFactor = diagonal / 1000; // Scale factor based on diagonal
      const calculatedSize = baseSize + (scaleFactor * 0.003);
      
      // Clamp the size to reasonable bounds
      const minSize = 0.001;
      const maxSize = 0.005;
      const finalSize = Math.max(minSize, Math.min(maxSize, calculatedSize));
      
      setParticleSize(finalSize);
    };

    // Update on mount and window resize
    updateParticleSize();
    window.addEventListener('resize', updateParticleSize);
    
    return () => {
      window.removeEventListener('resize', updateParticleSize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Normalize mouse position to [-1, 1] range
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      
      // Convert to world coordinates
      // The camera is at [0, 0, 2.5] looking at origin
      // Project mouse coordinates to the z=0 plane
      const fov = 75 * (Math.PI / 180); // Convert to radians
      const aspect = rect.width / rect.height;
      const distance = 2.5; // Camera distance
      
      // Calculate the size of the projection plane at z=0
      const planeHeight = 2 * Math.tan(fov / 2) * distance;
      const planeWidth = planeHeight * aspect;
      
      // Convert normalized coordinates to world coordinates
      const worldX = x * (planeWidth / 2);
      const worldY = y * (planeHeight / 2);
      
      setMouse3D(new THREE.Vector3(worldX, worldY, 0));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10" style={{ pointerEvents: 'auto' }}>
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
        <AnimatedSphere mouse3D={mouse3D} particleSize={particleSize} />
      </Canvas>
    </div>
  );
}
