import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import { ShoppingCart, Code, Palette, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface Skill {
  name: string;
  category: string;
  color: string;
  experience: string;
}

const skills: Skill[] = [
	{
		name: 'WooCommerce',
		category: 'e-commerce',
		color: '#8b5cf6',
		experience: '50+ stores built • Payment gateways • Multi-vendor setups',
	},
	{
		name: 'OpenCart',
		category: 'e-commerce',
		color: '#a855f7',
		experience: 'Multi-store management • Custom extensions • Performance optimization',
	},
	{
		name: 'Custom Solutions',
		category: 'development',
		color: '#06b6d4',
		experience: 'Headless commerce • API integrations • Scalable architectures',
	},
	{
		name: 'Three.js Magic',
		category: 'specialty',
		color: '#f59e0b',
		experience: '3D product viewers • Interactive experiences • WebGL wizardry',
	},
	{
		name: 'UI/UX Craft',
		category: 'design',
		color: '#10b981',
		experience: 'Conversion optimization • User journey mapping • A/B testing',
	},
	{
		name: 'Performance',
		category: 'optimization',
		color: '#ef4444',
		experience: 'Core Web Vitals • CDN setup • Database optimization • Speed = Sales',
	},
];

function Word({ 
	skill, 
	position, 
	index, 
	focusedIndex 
}: { 
	skill: Skill; 
	position: [number, number, number]; 
	index: number;
	focusedIndex: number;
}) {
	const groupRef = useRef<THREE.Group>(null!);
	const isFocused = index === focusedIndex;

	useFrame(() => {
		if (groupRef.current) {
			// Move focused word to exact center, others stay in tighter orbit
			const targetPosition = isFocused 
				? new THREE.Vector3(0, 0, 0.5) 
				: new THREE.Vector3(...position);
			
			groupRef.current.position.lerp(targetPosition, 0.04); // Slower transition
			
			// Scale focused word larger, others smaller and more transparent
			const targetScale = isFocused ? 2.2 : 0.6;
			groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.04);
		}
	});

	return (
		<group ref={groupRef}>
			<Billboard>
				{isFocused ? (
					<group>
						<Text
							fontSize={0.16}
							color="#000000"
							anchorX="center"
							anchorY="middle"
							fontWeight="bold"
							position={[0, 0.08, 0]}
						>
							{skill.name}
						</Text>
						
						<Text
							position={[0, -0.08, 0]}
							fontSize={0.07}
							color="#000000"
							anchorX="center"
							anchorY="middle"
							maxWidth={2.8}
							textAlign="center"
							lineHeight={1.6}
						>
							{skill.experience}
						</Text>
					</group>
				) : (
					<Text
						fontSize={0.09}
						color="#666666"
						anchorX="center"
						anchorY="middle"
						fontWeight="normal"
					>
						{skill.name}
					</Text>
				)}
			</Billboard>
		</group>
	);
}

function BackgroundElements() {
	const particlesRef = useRef<THREE.Points>(null!);
	const ringRef = useRef<THREE.Mesh>(null!);
	const wireframeRef = useRef<THREE.Mesh>(null!);

	useFrame((state) => {
		// Animate floating particles
		if (particlesRef.current) {
			particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
			particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
		}

		// Animate background ring
		if (ringRef.current) {
			ringRef.current.rotation.z = state.clock.elapsedTime * 0.02;
			ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
		}

		// Animate wireframe sphere
		if (wireframeRef.current) {
			wireframeRef.current.rotation.y = -state.clock.elapsedTime * 0.015;
			wireframeRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.4) * 0.1;
		}
	});

	const particlePositions = useMemo(() => {
		const positions = new Float32Array(200 * 3);
		for (let i = 0; i < 200; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 15;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
		}
		return positions;
	}, []);

	return (
		<group>
			<points ref={particlesRef}>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						args={[particlePositions, 3]}
					/>
				</bufferGeometry>
				<pointsMaterial
					size={0.04}
					color="#666666"
					transparent
					opacity={1}
				/>
			</points>

			<mesh ref={wireframeRef} position={[0, 0, -3]}>
				<sphereGeometry args={[2.5, 8, 8]} />
				<meshBasicMaterial
					color="#4a5568"
					wireframe
					transparent
					opacity={0.15}
				/>
			</mesh>
		</group>
	);
}

function WordCloud() {
	const groupRef = useRef<THREE.Group>(null!);
	const [focusedIndex, setFocusedIndex] = useState(0);

	useFrame((state) => {
		if (groupRef.current) {
			groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
			groupRef.current.rotation.x = THREE.MathUtils.lerp(
				groupRef.current.rotation.x, 
				state.pointer.y * 0.1, 
				0.05
			);
		}
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setFocusedIndex((prev) => (prev + 1) % skills.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	const words = useMemo(() => {
		const temp = [];
		const phi = Math.PI * (3 - Math.sqrt(5));
		const numPoints = skills.length;

		for (let i = 0; i < numPoints; i++) {
			const y = 1 - (i / (numPoints - 1)) * 2;
			const radius = Math.sqrt(1 - y * y);
			const theta = phi * i;
			const x = Math.cos(theta) * radius;
			const z = Math.sin(theta) * radius;

			temp.push(
				<Word 
					key={i} 
					position={[x * 1.8, y * 1.8, z * 1.8]} 
					skill={skills[i]} 
					index={i}
					focusedIndex={focusedIndex}
				/>
			);
		}
		return temp;
	}, [focusedIndex]);

	return <group ref={groupRef}>{words}</group>;
}

export function AboutSection() {
	const expertise = [
		{
			icon: ShoppingCart,
			title: 'E-Commerce Specialist',
			items: [
				'WordPress WooCommerce',
				'OpenCart Stores',
				'Shopify Development',
				'Custom E-Commerce Solutions',
			],
		},
		{
			icon: Code,
			title: 'Full-Stack Development',
			items: [
				'React & Next.js',
				'Node.js & PHP',
				'Custom Web Applications',
				'API Integration',
			],
		},
		{
			icon: Palette,
			title: 'Design & User Experience',
			items: [
				'Modern UI/UX Design',
				'Responsive Web Design',
				'Brand Identity',
				'Conversion Optimization',
			],
		},
		{
			icon: Box,
			title: '3D & Interactive',
			items: [
				'Three.js Development',
				'Interactive Experiences',
				'3D Visualizations',
				'Creative Solutions',
			],
		},
	];

	return (
		<section
			id="about"
			className="py-20 bg-gradient-to-b from-background to-secondary/10 relative"
		>
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-300 bg-clip-text text-transparent">
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
							<h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary">What I Do Best</h3>
							<p className="text-muted-foreground text-base leading-relaxed">
								I specialize in creating e-commerce solutions that actually convert. Whether you need a 
                WordPress WooCommerce store, an OpenCart setup, or a completely custom platform, 
                I focus on performance, user experience, and results.
							</p>
						</div>

						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary">My Approach</h3>
							<p className="text-muted-foreground text-base leading-relaxed">
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
						className="h-96 lg:h-[500px] relative rounded-2xl overflow-hidden"
					>
						<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-gray-900 rounded-2xl" />
						<Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
							{/* Gradient background using a large plane */}
							<mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
								<planeGeometry args={[25, 25]} />
								<meshBasicMaterial>
									<primitive 
										object={(() => {
											const canvas = document.createElement('canvas');
											canvas.width = 256;
											canvas.height = 256;
											const ctx = canvas.getContext('2d')!;
											const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
											gradient.addColorStop(0, '#1a1a2e');
											gradient.addColorStop(0.4, '#16213e');
											gradient.addColorStop(0.8, '#0f1627');
											gradient.addColorStop(1, '#0a0a0a');
											ctx.fillStyle = gradient;
											ctx.fillRect(0, 0, 256, 256);
											return new THREE.CanvasTexture(canvas);
										})()}
									/>
								</meshBasicMaterial>
							</mesh>
							<ambientLight intensity={0.9} />
							<pointLight position={[5, 5, 5]} intensity={1} />
							<BackgroundElements />
							<WordCloud />
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
					<h3 className="text-3xl font-semibold text-center mb-12">
						Areas of Expertise
					</h3>
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
											<li
												key={item}
												className="text-muted-foreground text-sm flex items-center"
											>
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
