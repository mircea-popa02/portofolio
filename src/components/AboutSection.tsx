import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Code, Palette, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface Skill {
	name: string;
	category: string;
	color: string;
	experience: string;
}

const getSkills = (t: (key: string) => string): Skill[] => [
	{
		name: t('about.skills.woocommerce.name'),
		category: 'e-commerce',
		color: '#8b5cf6',
		experience: t('about.skills.woocommerce.experience'),
	},
	{
		name: t('about.skills.opencart.name'),
		category: 'e-commerce',
		color: '#a855f7',
		experience: t('about.skills.opencart.experience'),
	},
	{
		name: t('about.skills.custom.name'),
		category: 'development',
		color: '#06b6d4',
		experience: t('about.skills.custom.experience'),
	},
	{
		name: t('about.skills.threejs.name'),
		category: 'specialty',
		color: '#f59e0b',
		experience: t('about.skills.threejs.experience'),
	},
	{
		name: t('about.skills.ui.name'),
		category: 'design',
		color: '#10b981',
		experience: t('about.skills.ui.experience'),
	},
	{
		name: t('about.skills.performance.name'),
		category: 'optimization',
		color: '#ef4444',
		experience: t('about.skills.performance.experience'),
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
				? new THREE.Vector3(0, 0, 1)
				: new THREE.Vector3(...position);

			groupRef.current.position.lerp(targetPosition, 0.04); // Slower transition

			// Scale focused word larger, others smaller and more transparent
			const targetScale = isFocused ? 1.8 : 0.6;
			groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.04);
		}
	});

	return (
		<group ref={groupRef}>
			<Billboard>
				{isFocused ? (
					<group>
						<Text
							fontSize={0.14}
							color="#000000"
							anchorX="center"
							anchorY="middle"
							fontWeight="bold"
							position={[0, 0.12, 0]}
						>
							{skill.name}
						</Text>

						<Text
							position={[0, -0.1, 0]}
							fontSize={0.06}
							color="#000000"
							anchorX="center"
							anchorY="middle"
							maxWidth={3.5}
							textAlign="center"
							lineHeight={1.4}
						>
							{skill.experience.split(' • ').join('\n')}
						</Text>
					</group>
				) : (
					<Text
						fontSize={0.2}
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
	const wireframeRef = useRef<THREE.Mesh>(null!);

	useFrame((state) => {
		if (particlesRef.current) {
			particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
			particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
		}
		if (wireframeRef.current) {
			wireframeRef.current.rotation.y = -state.clock.elapsedTime * 0.1;
			wireframeRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.4) * 0.1;
		}
	});

	const particlePositions = useMemo(() => {
		const positions = new Float32Array(200 * 3);
		for (let i = 0; i < 400; i++) {
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
					size={0.08}
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
	const { t } = useTranslation();
	const skills = getSkills(t);

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
	}, [skills.length]);

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
	}, [focusedIndex, skills]);

	return <group ref={groupRef}>{words}</group>;
}

export function AboutSection() {
	const { t } = useTranslation();
	
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
						{t('about.title')}
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						{t('about.description')}
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
							<h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary">{t('about.whatIDoBest')}</h3>
							<p className="text-muted-foreground text-base leading-relaxed">
								{t('about.whatIDoDescription')}
							</p>
						</div>

						<div>
							<h3 className="text-xl md:text-2xl font-semibold mb-4 text-primary">{t('about.myApproach')}</h3>
							<p className="text-muted-foreground text-base leading-relaxed">
								{t('about.myApproachDescription')}
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
						<Canvas
							camera={{ position: [0, 0, 4.5], fov: 50 }}
							style={{ width: '100%', height: '100%' }}
						>
							<mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
								<planeGeometry args={[26, 26]} />
								<meshBasicMaterial>
									<primitive
										object={(() => {
											const canvas = document.createElement('canvas');
											canvas.width = 256;
											canvas.height = 256;
											const ctx = canvas.getContext('2d')!
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
