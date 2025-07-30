import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Squiggly line geometry generator
function SquigglyLine({ scrollY, currentSection }: { scrollY: number, currentSection: string }) {
  const ref = useRef<THREE.Line>(null);
  const points = [];
  const amplitude = 0.5;
  const frequency = 0.2;
  const length = 10;
  for (let i = 0; i < 100; i++) {
    const y = (i / 99) * length - length / 2;
    const x = Math.sin(y * frequency + scrollY * 0.01) * amplitude;
    points.push(new THREE.Vector3(x, y, 0));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  useFrame((state) => {
    if (ref.current) {
      // Animate the squiggle based on scroll
      for (let i = 0; i < 100; i++) {
        const y = (i / 99) * length - length / 2;
        const x = Math.sin(y * frequency + scrollY * 0.01 + performance.now() * 0.002) * amplitude;
        geometry.attributes.position.setXYZ(i, x, y, 0);
      }
      geometry.attributes.position.needsUpdate = true;

      const targetY = sectionsInfo[currentSection]?.y ?? 0;
      state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <line href={ref} geometry={geometry}>
      <lineBasicMaterial attach="material" color="#ff00cc" linewidth={4} />
    </line>
  );
}

// Tooltip info at certain scroll positions
// Section info for display
const SECTIONS = [
  { id: 'hero', name: 'Home', info: 'Welcome to the homepage!' },
  { id: 'about', name: 'About', info: 'Learn more about me.' },
  { id: 'projects', name: 'Projects', info: 'Check out my work.' },
  { id: 'contact', name: 'Contact', info: 'Get in touch!' },
];

const sectionsInfo: { [key: string]: { y: number; text: string } } = {
  home: { y: 0, text: "Home" },
  about: { y: -1, text: "About" },
  projects: { y: -2, text: "Projects" },
  contact: { y: -3, text: "Contact" },
};

function useCurrentSection() {
  const [current, setCurrent] = useState(SECTIONS[0]);

  useEffect(() => {
    function onScroll() {
      let found = SECTIONS[0];
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            found = section;
          }
        }
      }
      setCurrent(found);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return current;
}

function SectionLabel({ section }: { section: typeof SECTIONS[0] }) {
  const [hover, setHover] = useState(false);
  return (
    <Html position={[1.2, 0, 0]} style={{ pointerEvents: 'auto', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
      <span
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ background: 'rgba(255,0,204,0.7)', padding: '6px 16px', borderRadius: 12 }}
      >
        {section.name}
      </span>
      {hover && (
        <div style={{
          position: 'absolute',
          left: '110%',
          top: 0,
          background: '#222',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: 8,
          whiteSpace: 'nowrap',
          fontSize: 14,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}>
          {section.info}
        </div>
      )}
    </Html>
  );
}

// Main component
const SquigglyLine3D: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const currentSection = useCurrentSection();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: '200px', pointerEvents: 'none', zIndex: 10 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SquigglyLine scrollY={scrollY} currentSection={currentSection.id} />
        <SectionLabel section={currentSection} />
      </Canvas>
      <SectionIndicator currentSection={currentSection.id} />
    </div>
  );
};

function SectionIndicator({ currentSection }: { currentSection: string }) {
  const info = sectionsInfo[currentSection];
  if (!info) return null;

  return (
    <motion.div
      key={currentSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border"
    >
      <p className="text-sm font-medium text-foreground">{info.text}</p>
    </motion.div>
  );
}

export default SquigglyLine3D;
