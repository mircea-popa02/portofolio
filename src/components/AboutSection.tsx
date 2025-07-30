import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import { ShoppingCart, Code, Palette, Box } from 'lucide-react';
import * as THREE from 'three';

function FloatingOrb({ skill, index }: {
  skill: { name: string; category: string; color: string; experience: string };
  index: number;
}) {
  const orbRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (orbRef.current) {
      // Complex orbital motion with multiple influences
      const time = state.clock.elapsedTime * 0.2;
      const primaryRadius = 1.5 + Math.sin(time * 0.5 + index) * 0.3;
      const secondaryRadius = 0.5 + Math.cos(time * 1.2 + index * 2) * 0.2;
      const primaryAngle = time + index * (Math.PI * 2) / 6;
      const secondaryAngle = time * 2 + index * (Math.PI * 4) / 6;
      
      // Primary orbital path
      const primaryX = Math.cos(primaryAngle) * primaryRadius;
      const primaryZ = Math.sin(primaryAngle) * primaryRadius;
      
      // Secondary wobble
      const secondaryX = Math.cos(secondaryAngle) * secondaryRadius * 0.3;
      const secondaryZ = Math.sin(secondaryAngle) * secondaryRadius * 0.3;
      
      orbRef.current.position.x = primaryX + secondaryX;
      orbRef.current.position.z = primaryZ + secondaryZ;
      orbRef.current.position.y = Math.sin(time * 1.5 + index * 1.5) * 0.4;
      
      // Pulsing effect
      const pulse = 1 + Math.sin(time * 3 + index) * 0.1;
      orbRef.current.scale.setScalar(pulse * (hovered ? 1.4 : 1));
    }
  });

  return (
    <group>
      <mesh
        ref={orbRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.4 : 0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Always visible text */}
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.08}
        color={hovered ? "#ffffff" : skill.color}
        anchorX="center"
        anchorY="bottom"
        fontWeight="bold"
      >
        {skill.name}
      </Text>
      
      {/* Experience text on hover */}
      {hovered && (
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.05}
          color="#cccccc"
          anchorX="center"
          anchorY="top"
          maxWidth={1.5}
          textAlign="center"
        >
          {skill.experience}
        </Text>
      )}
      
      {/* Orbital trail effect */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(Array.from({ length: 30 }, (_, i) => {
              const angle = (index * (Math.PI * 2) / 6) - (i * 0.1);
              const radius = 1.5;
              return [
                Math.cos(angle) * radius,
                Math.sin(i * 0.2) * 0.1,
                Math.sin(angle) * radius
              ];
            }).flat()), 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.015} 
          color={skill.color} 
          transparent 
          opacity={0.3}
          vertexColors={false}
        />
      </points>
    </group>
  );
}

function SkillGalaxy() {
  const skills = [
    { 
      name: 'WooCommerce', 
      category: 'e-commerce', 
      color: '#8b5cf6',
      experience: '50+ stores built • Payment gateways • Multi-vendor setups'
    },
    { 
      name: 'OpenCart', 
      category: 'e-commerce', 
      color: '#a855f7',
      experience: 'Multi-store management • Custom extensions • Performance optimization'
    },
    { 
      name: 'Custom Solutions', 
      category: 'development', 
      color: '#06b6d4',
      experience: 'Headless commerce • API integrations • Scalable architectures'
    },
    { 
      name: 'Three.js Magic', 
      category: 'specialty', 
      color: '#f59e0b',
      experience: '3D product viewers • Interactive experiences • WebGL wizardry'
    },
    { 
      name: 'UI/UX Craft', 
      category: 'design', 
      color: '#10b981',
      experience: 'Conversion optimization • User journey mapping • A/B testing'
    },
    { 
      name: 'Performance', 
      category: 'optimization', 
      color: '#ef4444',
      experience: 'Core Web Vitals • CDN setup • Database optimization • Speed = Sales'
    },
  ];

  return (
    <group>
      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#4f46e5"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Orbiting skills */}
      {skills.map((skill, index) => (
        <FloatingOrb
          key={skill.name}
          skill={skill}
          index={index}
        />
      ))}
      
      {/* Connecting particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * 8)), 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#6366f1" transparent opacity={0.2} />
      </points>
    </group>
  );
}

export function AboutSection() {
  const expertise = [
    {
      icon: ShoppingCart,
      title: "E-Commerce Specialist",
      items: ["WordPress WooCommerce", "OpenCart Stores", "Shopify Development", "Custom E-Commerce Solutions"]
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      items: ["React & Next.js", "Node.js & PHP", "Custom Web Applications", "API Integration"]
    },
    {
      icon: Palette,
      title: "Design & User Experience",
      items: ["Modern UI/UX Design", "Responsive Web Design", "Brand Identity", "Conversion Optimization"]
    },
    {
      icon: Box,
      title: "3D & Interactive",
      items: ["Three.js Development", "Interactive Experiences", "3D Visualizations", "Creative Solutions"]
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Building Digital Commerce
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I create high-converting e-commerce websites and custom web solutions that drive business growth. 
            From WordPress stores to cutting-edge 3D experiences, I bring your digital vision to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">What I Do Best</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I specialize in creating e-commerce solutions that actually convert. Whether you need a 
                WordPress WooCommerce store, an OpenCart setup, or a completely custom platform, 
                I focus on performance, user experience, and results.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">My Approach</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every project starts with understanding your business goals. I then craft solutions 
                that combine modern design, solid development practices, and sometimes a touch of 
                3D magic to make your website truly memorable.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-96 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 rounded-2xl" />
            <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[5, 5, 5]} intensity={0.6} />
              <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8b5cf6" />
              <pointLight position={[0, 0, 0]} intensity={0.8} color="#ffffff" />
              <SkillGalaxy />
              <OrbitControls 
                enableZoom={true}
                minDistance={1}
                maxDistance={8}
                autoRotate 
                autoRotateSpeed={0.5}
                enablePan={true}
                enableDamping={true}
                dampingFactor={0.02}
                target={[0, 0, 0]}
              />
            </Canvas>
          </motion.div>
        </div>

        {/* Expertise Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-semibold text-center mb-12">Areas of Expertise</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertise.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30">
                  <area.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-semibold mb-4">{area.title}</h4>
                  <ul className="space-y-2">
                    {area.items.map((item) => (
                      <li key={item} className="text-muted-foreground text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
